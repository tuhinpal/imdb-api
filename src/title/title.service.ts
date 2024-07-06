import parseNextData from "@/common/utils/parse-nextdata";
import { imdbApi } from "@/common/imdb-api";
import { TitleItem, TitleResultRaw } from "@/types/Title";
import { ColorationType, MediaType } from "@/types/Common";
import { secondsToRuntime } from "@/common/utils/runtime";
import { createImageVariants } from "@/common/utils/image";

export async function title({ titleId }: { titleId: string }) {
  const rawHtml = await imdbApi<string>({
    method: "GET",
    url: `https://www.imdb.com/title/${titleId}/`,
  });

  const parsed = parseNextData<TitleResultRaw>(rawHtml);

  const data: TitleItem = {
    id: parsed.aboveTheFoldData.id,
    isAdult: parsed.mainColumnData.isAdult,
    title: parsed.aboveTheFoldData.titleText?.text || "Unnamed",
    titleType: parsed.aboveTheFoldData.titleType.id as MediaType,
    originalTitle: parsed.aboveTheFoldData.originalTitleText?.text || "Unnamed",
    plot: parsed.aboveTheFoldData.plot?.plotText?.plainText || null,
    rating: {
      star: parsed.aboveTheFoldData.ratingsSummary?.aggregateRating || 0,
      votes: parsed.aboveTheFoldData.ratingsSummary?.voteCount || 0,
    },
    haveEpisodes: parsed.aboveTheFoldData.canHaveEpisodes,
    certificate: parsed.aboveTheFoldData.certificate?.rating || null,
    runtime: secondsToRuntime(parsed.aboveTheFoldData.runtime?.seconds),
    image: createImageVariants(parsed.aboveTheFoldData.primaryImage?.url),
    images: (parsed.mainColumnData.titleMainImages?.edges || []).map(
      (image) => ({
        caption: image.node.caption?.plainText || null,
        image: createImageVariants(image.node.url),
      })
    ),
    releaseStatus:
      parsed.mainColumnData.productionStatus?.currentProductionStage?.id ||
      "unknown",
    releaseDate: parsed.mainColumnData.releaseDate
      ? new Date(
          parsed.mainColumnData.releaseDate.year,
          parsed.mainColumnData.releaseDate.month - 1,
          parsed.mainColumnData.releaseDate.day || 1
        )
      : null,
    releaseCountry: parsed.mainColumnData.releaseDate
      ? {
          id: parsed.mainColumnData.releaseDate.country.id,
          name: parsed.mainColumnData.releaseDate.country.text,
        }
      : null,
    spokenLanguages: (
      parsed.mainColumnData.spokenLanguages?.spokenLanguages || []
    ).map((lang) => ({
      id: lang.id,
      name: lang.text,
    })),
    genres: (parsed.aboveTheFoldData.genres?.genres || []).map((genre) => ({
      id: genre.id.toLowerCase(),
      name: genre.text,
    })),
    casts: (parsed.mainColumnData.cast?.edges || []).map((cast) => ({
      id: cast.node.name.id,
      name: cast.node.name.nameText?.text,
      image: createImageVariants(cast.node.name.primaryImage?.url),
    })),
    directors: (parsed.mainColumnData.directors || [])
      .map((director) => {
        return director.credits.map((credit) => ({
          id: credit.name.id,
          name: credit.name.nameText.text,
        }));
      })
      .flat(),
    writers: (parsed.mainColumnData.writers || [])
      .map((writer) => {
        return writer.credits.map((credit) => ({
          id: credit.name.id,
          name: credit.name.nameText.text,
        }));
      })
      .flat(),
    productionCompanies: (parsed.mainColumnData.production.edges || []).map(
      (company) => ({
        id: company.node.company.id,
        name: company.node.company.companyText.text,
      })
    ),
    colorations: (
      parsed.mainColumnData.technicalSpecifications.colorations?.items || []
    ).map((coloration) => coloration.conceptId) as ColorationType[],
    aspectRations: (
      parsed.mainColumnData.technicalSpecifications.aspectRatios?.items || []
    ).map((aspectRatio) => aspectRatio.aspectRatio),
  };

  return data;
}
