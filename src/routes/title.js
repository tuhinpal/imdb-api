import { Hono } from "hono";
import { getSeason } from "../helpers/seriesFetcher";
import getTitle from "../helpers/getTitle";

const title = new Hono();

title.get("/:id", async (c) => {
  const id = c.req.param("id");

  try {
    const result = await getTitle(id);

    return c.json(result);
  } catch (error) {
    c.status(500);
    return c.json({
      message: error.message,
    });
  }
});

title.get("/:id/season/:seasonId", async (c) => {
  const id = c.req.param("id");
  const seasonId = c.req.param("seasonId");

  try {
    const result = await getSeason({ id, seasonId });

    const response = Object.assign(
      {
        id,
        title_api_path: `/title/${id}`,
        imdb: `https://www.imdb.com/title/${id}/episodes?season=${seasonId}`,
        season_id: seasonId,
      },
      result
    );

    return c.json(response);
  } catch (error) {
    c.status(500);
    return c.json({
      message: error.message,
    });
  }
});

export default title;

function getNode(dom, tag, id) {
  return dom
    .getElementsByTagName(tag)
    .find((e) => e.attributes.find((e) => e.value === id));
}
