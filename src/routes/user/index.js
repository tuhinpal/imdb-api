import { Hono } from "hono";
import userInfo from "./info";
const userRoutes = new Hono();

userRoutes.route("/", userInfo);

export default userRoutes;
