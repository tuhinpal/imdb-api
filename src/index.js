import { Hono } from "hono";
import { cors } from "hono/dist/middleware/cors/index";
import index from "./routes/index";
import reviews from "./routes/reviews";
import title from "./routes/title";
import search_DEPRECATED from "./routes/search_DEPRECATED";
import search from "./routes/search";

const app = new Hono();

app.use("*", cors());

app.route("/search", search);
app.route("/title", title);
app.route("/reviews", reviews);
app.route("/", index);

/** NOTE:
 *  These routes will be removed in future
 */

app.route("/search_DEPRECATED", search_DEPRECATED);

app.fire();
