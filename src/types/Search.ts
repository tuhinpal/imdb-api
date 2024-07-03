import { Image, MediaType, Rating, Runtime } from "./Common";

export type SearchItem = {
  id: string;
  title: string;
  titleType: MediaType;
  originalTitle: string;
  plot: string | null;
  rating: Rating;
  haveEpisodes: boolean;
  certificate: string | null;
  runtime: Runtime;
  image: Image;
};

export type SearchPagination = {
  totalCount: number;
  thisPageCount: number;
  hasNextPage: boolean;
  endCursor: string | null;
};

export type Search = {
  pagination: SearchPagination;
  data: SearchItem[];
};

export type SearchResultRaw = {
  data: {
    advancedTitleSearch: {
      total: number;
      pageInfo: {
        hasPreviousPage: boolean;
        hasNextPage: boolean;
        startCursor: string;
        endCursor: string;
      };
      genres: Array<{
        filterId: string;
        text: string;
        total: number;
      }>;
      keywords: Array<{
        filterId: string;
        text: string;
        total: number;
      }>;
      titleTypes: Array<{
        filterId: string;
        text: string;
        total: number;
      }>;
      edges: Array<{
        node: {
          title: {
            id: string;
            titleText: {
              text: string;
            };
            titleType: {
              id: string;
              text: string;
              canHaveEpisodes: boolean;
              displayableProperty: {
                value: {
                  plainText: string;
                };
              };
            };
            originalTitleText: {
              text: string;
            };
            primaryImage?: {
              id: string;
              width: number;
              height: number;
              url: string;
              caption: {
                plainText: string;
              };
            };
            releaseYear?: {
              year: number;
              endYear?: number;
            };
            ratingsSummary: {
              aggregateRating?: number;
              voteCount: number;
            };
            runtime?: {
              seconds: number;
            };
            certificate?: {
              rating: string;
            };
            canRate: {
              isRatable: boolean;
            };
            titleGenres?: {
              genres: Array<{
                genre: {
                  text: string;
                };
              }>;
            };
            canHaveEpisodes: boolean;
            plot?: {
              plotText?: {
                plainText: string;
              };
            };
            latestTrailer: any;
            series: any;
            metacritic: any;
          };
        };
      }>;
    };
  };
  extensions: {
    disclaimer: string;
    experimentalFields: {
      search: Array<any>;
      metacritic: Array<any>;
      ratings: Array<any>;
      video: Array<any>;
      janet: Array<any>;
      markdown: Array<any>;
    };
  };
};
