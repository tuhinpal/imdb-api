import { Hono } from "hono";
import * as titleController from "@/title/title.controller";

const title = new Hono();

title.get("/:titleId", titleController.title);

export default title;
