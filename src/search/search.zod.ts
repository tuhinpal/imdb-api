import { ColorationType, MediaType, SortOption } from "@/types/Common";
import { z } from "zod";

export const searchQueryZodSchema = z.object({
  query: z.string().min(1, "Query is required!"),
  limit: z.number().int().min(1).max(50).default(50),
  locale: z.string().default("en-US"),
  sortKey: z
    .enum([
      SortOption.POPULARITY,
      SortOption.TITLE_REGIONAL,
      SortOption.USER_RATING,
      SortOption.USER_RATING_COUNT,
      SortOption.BOX_OFFICE_GROSS_DOMESTIC,
      SortOption.RUNTIME,
      SortOption.YEAR,
      SortOption.RELEASE_DATE,
    ])
    .default(SortOption.POPULARITY),
  sortOrder: z.enum(["ASC", "DESC"]).default("ASC"),
  after: z.string().optional(),
  contentTypes: z
    .array(
      z.enum([
        MediaType.MOVIE,
        MediaType.TV_SERIES,
        MediaType.SHORT,
        MediaType.TV_EPISODE,
        MediaType.TV_MINI_SERIES,
        MediaType.TV_MOVIE,
        MediaType.TV_SPECIAL,
        MediaType.TV_SHORT,
        MediaType.VIDEO_GAME,
        MediaType.VIDEO,
        MediaType.MUSIC_VIDEO,
        MediaType.PODCAST_SERIES,
        MediaType.PODCAST_EPISODE,
      ])
    )
    .optional(),
  releaseFromDate: z.coerce.date().optional(),
  releaseToDate: z.coerce.date().optional(),
  genres: z.array(z.string()).optional(),
  fromRating: z.number().int().min(0).max(10).optional(),
  toRating: z.number().int().min(0).max(10).optional(),
  colorationTypes: z
    .array(
      z.enum([
        ColorationType.COLOR,
        ColorationType.BLACK_AND_WHITE,
        ColorationType.COLORIZED,
        ColorationType.ACES,
      ])
    )
    .optional(),
});

export type SearchQueryZodSchema = z.infer<typeof searchQueryZodSchema>;
