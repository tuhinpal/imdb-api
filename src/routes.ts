import { Hono } from "hono";
import searchRoutes from "@/search/search.routes";
import titleRoutes from "@/title/title.routes";

const routes = new Hono();

routes.route("/search", searchRoutes);
routes.route("/title", titleRoutes);

export default routes;
