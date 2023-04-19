import { Hono } from "hono";
import userInfo from "./info";
import userRating from "./rating";
const userRoutes = new Hono();

userRoutes.get("/:id", userInfo);
userRoutes.get("/:id/ratings", userRating);

export default userRoutes;
