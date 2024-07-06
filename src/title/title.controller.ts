import { Context } from "hono";
import * as titleService from "@/title/title.service";

export async function title(c: Context) {
  const titleId = c.req.param("titleId");

  const data = await titleService.title({ titleId });

  return c.json({
    message: "Fetched title",
    data,
  });
}
