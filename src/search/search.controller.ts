import { Context } from "hono";
import * as searchService from "@/search/search.service";
import zodValidator from "@/common/utils/zod-validator";
import * as searchZod from "@/search/search.zod";

export const search = async (c: Context) => {
  const query = await zodValidator(
    searchZod.searchQueryZodSchema,
    await c.req.json()
  );

  const data = await searchService.search({
    query,
  });

  return c.json({
    message: "Search successful!",
    ...data,
  });
};
