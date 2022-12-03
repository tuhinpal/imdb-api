import { Hono } from "hono";
import DomParser from "dom-parser";
import { decode as entityDecoder } from "html-entities";
import config from "../../config";
import apiRequestRawHtml from "../helpers/apiRequestRawHtml";

const search_DEPRECATED = new Hono();

search_DEPRECATED.use("/", async (c, next) => {
  let query = c.req.query("query");

  try {
    if (query) {
      let get = await CACHE.get(`search-${query}`);
      if (get) {
        c.header("x-cache", "HIT");
        return c.json(JSON.parse(get));
      }
    }
  } catch (_) {}
  await next();
  c.header("x-cache", "MISS");
});

search_DEPRECATED.get("/", async (c) => {
  try {
    let query = c.req.query("query");
    if (!query) throw new Error("Query param is required");

    let parser = new DomParser();
    let rawHtml = await apiRequestRawHtml(
      `https://www.imdb.com/find?&q=${query.split(" ").join("+")}`
    );

    let dom = parser.parseFromString(rawHtml);

    let response = {
      query: query,
    };

    let titles = [];

    let item = dom.getElementsByClassName("findList")[0];

    item.childNodes.forEach((node) => {
      // find image by img tag
      try {
        let image = node.getElementsByTagName("img")[0].attributes;
        image = image.find((attr) => attr.name === "src").value;

        try {
          image = image.replace(/[.]_.*_[.]/, `._V1_UY396_CR6,0,291,396_AL_.`);
        } catch (_) {}

        let image_large = image;
        try {
          image_large = image_large.replace(/[.]_.*_[.]/, ".");
        } catch (_) {}

        let a = node.getElementsByTagName("a")[0].attributes;
        a = a.find((attr) => attr.name === "href").value;
        let match = a.match(/\/title\/(.*)\//);
        let id = match[1];

        let title = node.getElementsByClassName("result_text")[0].textContent;
        title = title.replace(/"/g, "'");
        title = title.trim();
        title = entityDecoder(title, { level: "html5" });

        titles.push({
          id,
          title,
          image,
          image_large,
          api_path: `/title/${id}`,
          imdb: `https://www.imdb.com/title/${id}`,
        });
      } catch (_) {}
    });

    response.results = titles;

    try {
      if (!config.cacheDisabled && titles.length > 0) {
        await CACHE.put(`search-${query}`, JSON.stringify(response), {
          expirationTtl: 21600,
        });
      }
    } catch (_) {}

    return c.json(response);
  } catch (error) {
    return c.json({
      query: null,
      results: [],
      message: error.message,
    });
  }
});

export default search_DEPRECATED;
