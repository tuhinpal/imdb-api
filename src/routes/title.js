import { Hono } from "hono";
import DomParser from "dom-parser";
import { decode as entityDecoder } from "html-entities";
import config from "../../config";
import seriesFetcher from "../helpers/seriesFetcher";
import apiRequestRawHtml from "../helpers/apiRequestRawHtml";
const title = new Hono();

title.use("/:id", async (c, next) => {
  const id = c.req.param("id");

  try {
    let get = await CACHE.get(id);
    if (get) {
      c.header("x-cache", "HIT");
      return c.json(JSON.parse(get));
    }
  } catch (_) {}
  await next();
  c.header("x-cache", "MISS");
});

title.get("/:id", async (c) => {
  const id = c.req.param("id");

  try {
    let parser = new DomParser();
    let rawHtml = await apiRequestRawHtml(`https://www.imdb.com/title/${id}`);

    let dom = parser.parseFromString(rawHtml);

    let response = {};

    // schema parse
    let schema = getNode(dom, "script", "application/ld+json");
    schema = JSON.parse(schema.innerHTML);

    // id
    response.id = id;

    // review
    response.review_api_path = `/reviews/${id}`;

    // imdb link
    response.imdb = `https://www.imdb.com/title/${id}`;

    // content type
    response.contentType = schema["@type"];

    // title
    // response.title = getNode(dom, "h1", "hero-title-block__title").innerHTML;
    response.title = entityDecoder(schema.name, { level: "html5" });

    // image
    response.image = schema.image;

    // plot
    // response.plot = getNode(dom, "span", "plot-l").innerHTML;
    response.plot = entityDecoder(schema.description, { level: "html5" });

    // rating
    response.rating = {
      count: schema.aggregateRating.ratingCount,
      star: schema.aggregateRating.ratingValue,
    };

    // content rating
    response.contentRating = schema.contentRating;

    // genre
    response.genre = schema.genre.map((e) =>
      entityDecoder(e, { level: "html5" })
    );

    // year and runtime
    try {
      let metadata = getNode(dom, "ul", "hero-title-block__metadata");
      response.year = metadata.firstChild.firstChild.innerHTML;
      response.runtime = metadata.lastChild.innerHTML
        .split("<!-- -->")
        .join("");
    } catch (_) {
      if (!response.year) response.year = null;
      response.runtime = null;
    }
    // actors
    try {
      response.actors = schema.actor.map((e) =>
        entityDecoder(e.name, { level: "html5" })
      );
    } catch (_) {
      response.actors = [];
    }
    // director
    try {
      response.directors = schema.director.map((e) =>
        entityDecoder(e.name, { level: "html5" })
      );
    } catch (_) {
      response.directors = [];
    }

    // top credits
    try {
      let top_credits = getNode(dom, "div", "title-pc-expanded-section")
        .firstChild.firstChild;

      response.top_credits = top_credits.childNodes.map((e) => {
        return {
          name: e.firstChild.textContent,
          value: e.childNodes[1].firstChild.childNodes.map((e) =>
            entityDecoder(e.textContent, { level: "html5" })
          ),
        };
      });
    } catch (_) {
      response.top_credits = [];
    }

    try {
      if (["TVSeries"].includes(response.contentType)) {
        let seasons = await seriesFetcher(id);
        response.seasons = seasons;
      }
    } catch (error) {}

    if (!config.cacheDisabled) {
      try {
        await CACHE.put(id, JSON.stringify(response), { expirationTtl: 86400 });
      } catch (_) {}
    }

    return c.json(response);
  } catch (error) {
    c.status(500);
    return c.json({
      message: error.message,
    });
  }
});

export default title;

function getNode(dom, tag, id) {
  return dom
    .getElementsByTagName(tag)
    .find((e) => e.attributes.find((e) => e.value === id));
}
