import { Hono } from "hono";
import { cors } from "hono/dist/middleware/cors/index";
import index from "./routes/index";
import reviews from "./routes/reviews";
import title from "./routes/title";
import cache from "./helpers/cache";
import search from "./routes/search";
import config from "../config";

const app = new Hono();

app.use("*", cors());
app.use(
  "*",
  cache({
    cacheControl: `public, max-age=${config.cacheTtl}`,
  })
);

app.route("/search", search);
app.route("/title", title);
app.route("/reviews", reviews);
app.route("/", index);

app.fire();
