import { Hono } from "hono";
import { cors } from "hono/dist/middleware/cors/index";
import index from "./routes/index";
import search from "./routes/search";
import title from "./routes/title";

const app = new Hono();

app.use("*", cors());

app.route("/search", search);
app.route("/title", title);
app.route("/", index);

app.fire();
