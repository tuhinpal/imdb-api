import { Hono } from "hono";
import searchRoutes from "@/search/search.routes";

const routes = new Hono();

routes.route("/search", searchRoutes);

export default routes;
