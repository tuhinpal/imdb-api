import { Hono } from "hono";
import { cors } from "hono/dist/middleware/cors/index";
import index from "./routes/index";
import reviews from "./routes/reviews";
import search from "./routes/search";
import searchV2 from "./routes/search_v2";
import title from "./routes/title";

const app = new Hono();

app.use("*", cors());

app.route("/search_DEPRECATED", search);
app.route("/search", searchV2);
app.route("/title", title);
app.route("/reviews", reviews);
app.route("/", index);

app.fire();
