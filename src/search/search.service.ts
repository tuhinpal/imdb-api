import { imdbGraphqlApi } from "@/common/imdb-api";
import { SearchQueryZodSchema } from "./search.zod";
import dayjs from "dayjs";
import { PERSISTED_QUERY_IDS } from "@/config";
import {
  Search,
  SearchItem,
  SearchPagination,
  SearchResultRaw,
} from "@/types/Search";
import { MediaType } from "@/types/Common";
import { secondsToRuntime } from "@/common/utils/runtime";
import { createImageVariants } from "@/common/utils/image";

export const search = async ({
  query,
}: {
  query: SearchQueryZodSchema;
}): Promise<Search> => {
  let queryBuilder: Record<string, any> = {};

  queryBuilder.first = query.limit;
  queryBuilder.locale = query.locale;
  queryBuilder.sortBy = query.sortKey;
  queryBuilder.sortOrder = query.sortOrder;
  queryBuilder.titleTextConstraint = { searchTerm: query.query };

  if (query.after) {
    queryBuilder.after = query.after;
  }

  if (query.genres) {
    queryBuilder.genreConstraint = {
      allGenreIds: query.genres,
      excludeGenreIds: [],
    };
  }

  if (query.colorationTypes) {
    queryBuilder.colorationConstraint = {
      anyColorationTypes: query.colorationTypes,
      excludeColorationTypes: [],
    };
  }

  if (query.contentTypes) {
    queryBuilder.titleTypeConstraint = {
      anyTitleTypeIds: query.contentTypes,
    };
  }

  if (query.releaseFromDate || query.releaseToDate) {
    queryBuilder.releaseDateConstraint = {
      releaseDateRange: {
        ...(query.releaseFromDate && {
          start: dayjs(query.releaseFromDate, "DD-MM-YYYY"),
        }),
        ...(query.releaseToDate && {
          end: dayjs(query.releaseToDate, "DD-MM-YYYY"),
        }),
      },
    };
  }

  if (query.fromRating || query.toRating) {
    queryBuilder.userRatingsConstraint = {
      aggregateRatingRange: {
        ...(query.fromRating && { min: query.fromRating }),
        ...(query.toRating && { max: query.toRating }),
      },
    };
  }

  const data = await imdbGraphqlApi<SearchResultRaw>({
    operationName: "AdvancedTitleSearch",
    variables: queryBuilder,
    persistedQueryHash: PERSISTED_QUERY_IDS.SEARCH,
  });

  const searchItems: SearchItem[] = data.data.advancedTitleSearch.edges.map(
    (edge) =>
      ({
        id: edge.node.title.id,
        title: edge.node.title.titleText.text,
        titleType: edge.node.title.titleType.id as MediaType,
        originalTitle: edge.node.title.originalTitleText.text,
        plot: edge.node.title.plot?.plotText?.plainText || null,
        rating: {
          star: edge.node.title.ratingsSummary.aggregateRating || 0,
          votes: edge.node.title.ratingsSummary.voteCount || 0,
        },
        haveEpisodes: edge.node.title.titleType.canHaveEpisodes,
        certificate: edge.node.title.certificate?.rating || null,
        runtime: secondsToRuntime(edge.node.title.runtime?.seconds),
        image: createImageVariants(edge.node.title.primaryImage?.url),
      } as SearchItem)
  );

  const pagination: SearchPagination = {
    totalCount: data.data.advancedTitleSearch.total,
    thisPageCount: searchItems.length,
    hasNextPage: data.data.advancedTitleSearch.pageInfo.hasNextPage,
    endCursor: data.data.advancedTitleSearch.pageInfo.endCursor,
  };

  return {
    pagination: pagination,
    data: searchItems,
  };
};
