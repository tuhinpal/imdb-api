export interface Image {
  original: string | null;
  small: string | null;
  medium: string | null;
  large: string | null;
}

// "movie","tvSeries","short","tvEpisode","tvMiniSeries","tvMovie","tvSpecial","tvShort","videoGame","video","musicVideo","podcastSeries","podcastEpisode"
export enum MediaType {
  MOVIE = "movie",
  TV_SERIES = "tvSeries",
  SHORT = "short",
  TV_EPISODE = "tvEpisode",
  TV_MINI_SERIES = "tvMiniSeries",
  TV_MOVIE = "tvMovie",
  TV_SPECIAL = "tvSpecial",
  TV_SHORT = "tvShort",
  VIDEO_GAME = "videoGame",
  VIDEO = "video",
  MUSIC_VIDEO = "musicVideo",
  PODCAST_SERIES = "podcastSeries",
  PODCAST_EPISODE = "podcastEpisode",
}

// "COLOR","BLACK_AND_WHITE","COLORIZED","ACES"
export enum ColorationType {
  COLOR = "COLOR",
  BLACK_AND_WHITE = "BLACK_AND_WHITE",
  COLORIZED = "COLORIZED",
  ACES = "ACES",
}

export type Rating = {
  star: number;
  votes: number;
};

export type Runtime = {
  seconds: number;
  text: string;
};

export enum SortOption {
  POPULARITY = "POPULARITY",
  TITLE_REGIONAL = "TITLE_REGIONAL",
  USER_RATING = "USER_RATING",
  USER_RATING_COUNT = "USER_RATING_COUNT",
  BOX_OFFICE_GROSS_DOMESTIC = "BOX_OFFICE_GROSS_DOMESTIC",
  RUNTIME = "RUNTIME",
  YEAR = "YEAR",
  RELEASE_DATE = "RELEASE_DATE",
}
