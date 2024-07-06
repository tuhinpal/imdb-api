import {
  ColorationType,
  Company,
  Country,
  Credit,
  Genre,
  Image,
  Language,
  MediaType,
  Rating,
  Runtime,
} from "./Common";

export type TitleItem = {
  id: string;
  isAdult: boolean;
  title: string;
  titleType: MediaType;
  originalTitle: string;
  plot: string | null;
  rating: Rating;
  haveEpisodes: boolean;
  certificate: string | null;
  runtime: Runtime;
  image: Image;
  images: {
    caption: string | null;
    image: Image;
  }[];
  releaseStatus: string;
  releaseDate: Date | null;
  releaseCountry: Country | null;
  spokenLanguages: Language[];
  genres: Genre[];
  casts: Credit[];
  directors: Credit[];
  writers: Credit[];
  productionCompanies: Company[];
  colorations: ColorationType[];
  aspectRations: string[];
};

export type TitleResultRaw = {
  tconst: string;
  aboveTheFoldData: {
    id: string;
    productionStatus: {
      currentProductionStage: {
        id: string;
        text: string;
      };
      productionStatusHistory: Array<{
        status: {
          id: string;
          text: string;
        };
      }>;
      restriction: any;
    };
    canHaveEpisodes: boolean;
    series: any;
    titleText: {
      text: string;
    };
    titleType: {
      displayableProperty: {
        value: {
          plainText: string;
        };
      };
      text: string;
      id: string;
      isSeries: boolean;
      isEpisode: boolean;
      categories: Array<{
        value: string;
      }>;
      canHaveEpisodes: boolean;
    };
    originalTitleText: {
      text: string;
    };
    certificate: {
      rating: string;
    };
    releaseYear: {
      year: number;
      endYear: any;
    };
    releaseDate: {
      day: number;
      month: number;
      year: number;
    };
    runtime: {
      seconds: number;
      displayableProperty: {
        value: {
          plainText: string;
        };
      };
    };
    canRate: {
      isRatable: boolean;
    };
    ratingsSummary: {
      aggregateRating: number;
      voteCount: number;
    };
    meterRanking: {
      currentRank: number;
      rankChange: {
        changeDirection: string;
        difference: number;
      };
    };
    primaryImage: {
      id: string;
      width: number;
      height: number;
      url: string;
      caption: {
        plainText: string;
      };
    };
    images: {
      total: number;
      edges: Array<{
        node: {
          id: string;
        };
      }>;
    };
    videos: {
      total: number;
    };
    primaryVideos: {
      edges: Array<{
        node: {
          id: string;
          createdDate: string;
          isMature: boolean;
          runtime: {
            value: number;
          };
          name: {
            value: string;
            language: string;
          };
          description: {
            value: string;
            language: string;
          };
          timedTextTracks: Array<any>;
          recommendedTimedTextTrack: any;
          thumbnail: {
            url: string;
            height: number;
            width: number;
          };
          primaryTitle: {
            id: string;
            titleText: {
              text: string;
            };
            originalTitleText: {
              text: string;
            };
            releaseYear: {
              year: number;
            };
          };
          playbackURLs: Array<{
            displayName: {
              value: string;
              language: string;
            };
            videoMimeType: string;
            videoDefinition: string;
            url: string;
          }>;
          contentType: {
            id: string;
            displayName: {
              value: string;
            };
          };
          previewURLs: Array<{
            displayName: {
              value: string;
              language: string;
            };
            videoMimeType: string;
            videoDefinition: string;
            url: string;
          }>;
        };
      }>;
    };
    externalLinks: {
      total: number;
    };
    metacritic: {
      metascore: {
        score: number;
      };
    };
    keywords: {
      total: number;
      edges: Array<{
        node: {
          text: string;
        };
      }>;
    };
    genres: {
      genres: Array<{
        text: string;
        id: string;
      }>;
    };
    plot: {
      plotText: {
        plainText: string;
      };
      language: {
        id: string;
      };
    };
    plotContributionLink: {
      url: string;
    };
    credits: {
      total: number;
    };
    principalCredits: Array<{
      totalCredits: number;
      category: {
        text: string;
        id: string;
      };
      credits: Array<{
        name: {
          nameText: {
            text: string;
          };
          id: string;
        };
        attributes: any;
      }>;
    }>;
    reviews: {
      total: number;
    };
    criticReviewsTotal: {
      total: number;
    };
    triviaTotal: {
      total: number;
    };
    engagementStatistics: {
      watchlistStatistics: {
        displayableCount: {
          text: string;
        };
      };
    };
    subNavCredits: {
      total: number;
    };
    subNavReviews: {
      total: number;
    };
    subNavTrivia: {
      total: number;
    };
    subNavFaqs: {
      total: number;
    };
    subNavTopQuestions: {
      total: number;
    };
    titleGenres: {
      genres: Array<{
        genre: {
          text: string;
        };
      }>;
    };
    meta: {
      canonicalId: string;
      publicationStatus: string;
    };
    castPageTitle: {
      edges: Array<{
        node: {
          name: {
            id: string;
            nameText: {
              text: string;
            };
          };
        };
      }>;
    };
    creatorsPageTitle: Array<any>;
    directorsPageTitle: Array<{
      credits: Array<{
        name: {
          id: string;
          nameText: {
            text: string;
          };
        };
      }>;
    }>;
    countriesOfOrigin: {
      countries: Array<{
        id: string;
      }>;
    };
    production: {
      edges: Array<{
        node: {
          company: {
            id: string;
            companyText: {
              text: string;
            };
          };
        };
      }>;
    };
    featuredReviews: {
      edges: Array<{
        node: {
          author: {
            nickName: string;
          };
          summary: {
            originalText: string;
          };
          text: {
            originalText: {
              plainText: string;
            };
          };
          authorRating: number;
          submissionDate: string;
        };
      }>;
    };
  };
  mainColumnData: {
    id: string;
    wins: {
      total: number;
    };
    nominations: {
      total: number;
    };
    prestigiousAwardSummary: any;
    ratingsSummary: {
      topRanking: {
        id: string;
        text: {
          value: string;
        };
        rank: number;
      };
    };
    episodes: any;
    videos: {
      total: number;
    };
    videoStrip: {
      edges: Array<{
        node: {
          id: string;
          contentType: {
            displayName: {
              value: string;
            };
          };
          name: {
            value: string;
          };
          runtime: {
            value: number;
          };
          thumbnail: {
            height: number;
            url: string;
            width: number;
          };
        };
      }>;
    };
    titleMainImages: {
      total: number;
      edges: Array<{
        node: {
          id: string;
          url: string;
          caption: {
            plainText: string;
          };
          height: number;
          width: number;
        };
      }>;
    };
    productionStatus: {
      currentProductionStage: {
        id: string;
        text: string;
      };
      productionStatusHistory: Array<{
        status: {
          id: string;
          text: string;
        };
      }>;
      restriction: any;
    };
    primaryImage: {
      id: string;
    };
    imageUploadLink: {
      url: string;
    };
    titleType: {
      id: string;
      canHaveEpisodes: boolean;
    };
    cast: {
      total: number;
      edges: Array<{
        node: {
          name: {
            id: string;
            nameText: {
              text: string;
            };
            primaryImage?: {
              url: string;
              width: number;
              height: number;
            };
          };
          attributes?: Array<{
            text: string;
          }>;
          category: {
            id: string;
          };
          characters: Array<{
            name: string;
          }>;
          episodeCredits: {
            total: number;
            yearRange: any;
          };
        };
      }>;
    };
    creators: Array<any>;
    directors: Array<{
      totalCredits: number;
      category: {
        text: string;
      };
      credits: Array<{
        name: {
          id: string;
          nameText: {
            text: string;
          };
        };
        attributes: any;
      }>;
    }>;
    writers: Array<{
      totalCredits: number;
      category: {
        text: string;
      };
      credits: Array<{
        name: {
          id: string;
          nameText: {
            text: string;
          };
        };
        attributes: any;
      }>;
    }>;
    isAdult: boolean;
    moreLikeThisTitles: {
      edges: Array<{
        node: {
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
          primaryImage: {
            id: string;
            width: number;
            height: number;
            url: string;
            caption: {
              plainText: string;
            };
          };
          releaseYear: {
            year: number;
            endYear: any;
          };
          ratingsSummary: {
            aggregateRating: number;
            voteCount: number;
          };
          runtime: {
            seconds: number;
          };
          certificate?: {
            rating: string;
          };
          canRate: {
            isRatable: boolean;
          };
          titleGenres: {
            genres: Array<{
              genre: {
                text: string;
              };
            }>;
          };
          canHaveEpisodes: boolean;
        };
      }>;
    };
    triviaTotal: {
      total: number;
    };
    trivia: {
      edges: Array<{
        node: {
          text: {
            plaidHtml: string;
          };
          trademark: any;
          relatedNames: any;
        };
      }>;
    };
    goofsTotal: {
      total: number;
    };
    goofs: {
      edges: Array<{
        node: {
          text: {
            plaidHtml: string;
          };
        };
      }>;
    };
    quotesTotal: {
      total: number;
    };
    quotes: {
      edges: Array<{
        node: {
          lines: Array<{
            characters: Array<{
              character: string;
              name: {
                id: string;
              };
            }>;
            text: string;
            stageDirection: any;
          }>;
        };
      }>;
    };
    crazyCredits: {
      edges: Array<{
        node: {
          text: {
            plaidHtml: string;
          };
        };
      }>;
    };
    alternateVersions: {
      total: number;
      edges: Array<{
        node: {
          text: {
            plaidHtml: string;
          };
        };
      }>;
    };
    connections: {
      edges: Array<{
        node: {
          associatedTitle: {
            id: string;
            releaseYear: {
              year: number;
            };
            titleText: {
              text: string;
            };
            originalTitleText: {
              text: string;
            };
            series: any;
          };
          category: {
            text: string;
          };
        };
      }>;
    };
    soundtrack: {
      edges: Array<{
        node: {
          text: string;
          comments: Array<{
            plaidHtml: string;
          }>;
        };
      }>;
    };
    titleText: {
      text: string;
    };
    originalTitleText: {
      text: string;
    };
    releaseYear: {
      year: number;
    };
    reviews: {
      total: number;
    };
    featuredReviews: {
      edges: Array<{
        node: {
          id: string;
          author: {
            nickName: string;
            userId: string;
          };
          summary: {
            originalText: string;
          };
          text: {
            originalText: {
              plaidHtml: string;
            };
          };
          authorRating: number;
          submissionDate: string;
          helpfulness: {
            upVotes: number;
            downVotes: number;
          };
        };
      }>;
    };
    canRate: {
      isRatable: boolean;
    };
    iframeAddReviewLink: {
      url: string;
    };
    topQuestions: {
      total: number;
      edges: Array<{
        node: {
          attributeId: string;
          question: {
            plainText: string;
          };
        };
      }>;
    };
    faqs: {
      total: number;
      edges: Array<{
        node: {
          id: string;
          question: {
            plainText: string;
          };
        };
      }>;
    };
    releaseDate: {
      day: number;
      month: number;
      year: number;
      country: {
        id: string;
        text: string;
      };
    };
    countriesOfOrigin: {
      countries: Array<{
        id: string;
        text: string;
      }>;
    };
    detailsExternalLinks: {
      edges: Array<{
        node: {
          url: string;
          label: string;
          externalLinkRegion: any;
        };
      }>;
      total: number;
    };
    spokenLanguages: {
      spokenLanguages: Array<{
        id: string;
        text: string;
      }>;
    };
    akas: {
      edges: Array<{
        node: {
          text: string;
        };
      }>;
    };
    filmingLocations: {
      edges: Array<{
        node: {
          text: string;
          location: string;
          attributes: Array<any>;
        };
      }>;
      total: number;
    };
    production: {
      edges: Array<{
        node: {
          company: {
            id: string;
            companyText: {
              text: string;
            };
          };
        };
      }>;
    };
    companies: {
      total: number;
    };
    productionBudget: any;
    lifetimeGross: {
      total: {
        amount: number;
        currency: string;
      };
    };
    openingWeekendGross: {
      gross: {
        total: {
          amount: number;
          currency: string;
        };
      };
      weekendEndDate: string;
    };
    worldwideGross: {
      total: {
        amount: number;
        currency: string;
      };
    };
    technicalSpecifications: {
      soundMixes: {
        items: Array<any>;
      };
      aspectRatios: {
        items: Array<{
          aspectRatio: string;
          attributes: Array<any>;
        }>;
      };
      colorations: {
        items: Array<{
          conceptId: string;
          text: string;
          attributes: Array<any>;
        }>;
      };
    };
    runtime: {
      seconds: number;
    };
    series: any;
    canHaveEpisodes: boolean;
    contributionQuestions: {
      contributionLink: {
        url: string;
      };
      edges: Array<{
        node: {
          entity: {
            primaryImage: {
              url: string;
              width: number;
              height: number;
              caption: {
                plainText: string;
              };
            };
          };
          questionId: string;
          questionText: {
            plainText: string;
          };
          contributionLink: {
            url: string;
          };
        };
      }>;
    };
  };
  titleCallToAction: {
    callToAction: {
      titleProUpsell: {
        action: {
          url: string;
          label: {
            text: string;
          };
        };
      };
    };
  };
  urqlState: any;
  fetchState: any;
};
