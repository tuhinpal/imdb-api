import { Hono } from "hono";
import DomParser from "dom-parser";
import { decode as entityDecoder } from "html-entities";
import config from "../../config";
import apiRequestRawHtml from "../helpers/apiRequestRawHtml";
const reviews = new Hono();

reviews.use("/:id", async (c, next) => {
  try {
    let id = c.req.param("id");
    let option = c.req.query("option");
    let sortOrder = c.req.query("sortOrder");
    let nextKey = c.req.query("nextKey");
    let cacheId = createCacheId({ id, option, sortOrder, nextKey });
    c.header("x-cacheid", cacheId);

    let get = await CACHE.get(cacheId);
    if (get) {
      c.header("x-cache", "HIT");
      return c.json(JSON.parse(get));
    }
  } catch (_) {}

  await next();
  c.header("x-cache", "MISS");
});

function createCacheId({ id, option, sortOrder, nextKey }) {
  if (!nextKey) nextKey = "";
  return `review~${id}~${option}~${sortOrder}~${nextKey}`;
}

reviews.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    let option = optionsMapper[0];
    try {
      let getOption = optionsMapper.find(
        (option) => option.name === c.req.query("option")
      );
      if (getOption) option = getOption;
    } catch (_) {}

    let sortOrder = c.req.query("sortOrder") === "asc" ? "asc" : "desc";
    let nextKey = c.req.query("nextKey");

    let reviews = [];

    let parser = new DomParser();
    let rawHtml = await apiRequestRawHtml(
      `https://www.imdb.com/title/${id}/reviews/_ajax?sort=${
        option.key
      }&dir=${sortOrder}${nextKey ? `&paginationKey=${nextKey}` : ""}`
    );
    let dom = parser.parseFromString(rawHtml);

    let item = dom.getElementsByClassName("imdb-user-review");

    item.forEach((node) => {
      try {
        let review = {};

        try {
          let reviewId = node.getAttribute("data-review-id");
          review.id = reviewId;
        } catch (_) {
          review.id = null;
        }

        try {
          let author = node.getElementsByClassName("display-name-link")[0];

          review.author = entityDecoder(author.textContent.trim(), {
            level: "html5",
          });

          review.authorUrl =
            "https://www.imdb.com" +
            author.getElementsByTagName("a")[0].getAttribute("href");
        } catch (_) {
          if (!review.author) review.author = "Anonymous";
          if (!review.authorUrl) review.authorUrl = null;
        }

        try {
          let reviewDate = node.getElementsByClassName("review-date")[0];
          review.date = reviewDate.textContent.trim();
        } catch (error) {
          if (!review.date) review.date = null;
        }

        try {
          let stars =
            node.getElementsByClassName("ipl-ratings-bar")[0].textContent;
          let match = stars.match(/\d+/g);
          review.stars = parseInt(match[0]);
        } catch (_) {
          review.stars = 0;
        }

        try {
          let heading = node.getElementsByClassName("title")[0];
          review.heading = entityDecoder(heading.textContent.trim(), {
            level: "html5",
          });
        } catch (_) {
          review.heading = null;
        }

        try {
          let content = node.getElementsByClassName("text")[0];
          review.content = entityDecoder(content.textContent.trim(), {
            level: "html5",
          });
        } catch (_) {
          review.content = null;
        }

        try {
          let helpfulNess = node
            .getElementsByClassName("actions")[0]
            .textContent.trim();

          //  text will be like this '223 out of 280 found this helpful'
          let match = helpfulNess.match(/\d+/g);

          review.helpfulNess = {
            votes: parseInt(match[1]),
            votedAsHelpful: parseInt(match[0]),
            votedAsHelpfulPercentage:
              Math.round((parseInt(match[0]) / parseInt(match[1])) * 100) || 0,
          };
        } catch (_) {
          review.helpfulNess = {
            votes: 0,
            votedAsHelpful: 0,
            votedAsHelpfulPercentage: 0,
          };
        }

        review.reviewLink = `https://www.imdb.com/review/${review.id}`;

        reviews.push(review);
      } catch (__) {}
    });

    let next = null;

    try {
      let morePage = dom.getElementsByClassName("load-more-data")[0];
      next = morePage.getAttribute("data-key");
      next = `/reviews/${id}?option=${option.name}&sortOrder=${sortOrder}&nextKey=${next}`;
    } catch (_) {}

    let result = {
      id,
      imdb: `https://www.imdb.com/title/${id}`,
      option: option.name,
      sortOrder,
      availableOptions: optionsMapper.map((option) => option.name),
      availableSortOrders: ["asc", "desc"],
      reviews,
      next_api_path: next,
    };

    try {
      if (!config.cacheDisabled) {
        await CACHE.put(
          createCacheId({
            id,
            option: option.name,
            sortOrder,
            nextKey: nextKey,
          }),
          JSON.stringify(result),
          {
            expirationTtl: 21600,
          }
        );
      }
    } catch (_) {}

    return c.json(result);
  } catch (error) {
    c.status(500);
    return c.json({
      message: error.message,
    });
  }
});

export default reviews;

const optionsMapper = [
  {
    key: "helpfulnessScore",
    name: "helpfulness",
  },
  {
    key: "submissionDate",
    name: "date",
  },
  {
    key: "totalVotes",
    name: "votes",
  },
  {
    key: "userRating",
    name: "rating",
  },
];
