import DomParser from "dom-parser";
import { decode as entityDecoder } from "html-entities";
import apiRequestRawHtml from "./apiRequestRawHtml";

const MAX_SEASONS = 2;

export default async function seriesFetcher(id) {
  let allSeasons = [];
  let seasons = [];

  try {
    let parser = new DomParser();
    let rawHtml = await apiRequestRawHtml(
      `https://www.imdb.com/title/${id}/episodes/_ajax`
    );
    let dom = parser.parseFromString(rawHtml);

    let seasonOption = dom.getElementById("bySeason");
    let seasonOptions = seasonOption.getElementsByTagName("option");
    for (let i = 0; i < seasonOptions.length; i++) {
      try {
        const seasonId = seasonOptions[i].getAttribute("value");
        let season = {
          id: seasonId,
          api_path: `/title/${id}/season/${seasonId}`,
          isSelected: seasonOptions[i].getAttribute("selected") === "selected",
          name: "",
          episodes: [],
        };
        seasons.push(season);
      } catch (_) {}
    }

    allSeasons = [...seasons];
    seasons = seasons.reverse();
    seasons = seasons.slice(0, MAX_SEASONS);

    await Promise.all(
      seasons.map(async (season) => {
        try {
          let html = "";
          if (season.isSelected) {
            html = rawHtml;
          } else {
            html = await apiRequestRawHtml(
              `https://www.imdb.com/title/${id}/episodes/_ajax?season=${season.id}`
            );
          }

          let parsed = parseEpisodes(html, season.id);
          season.name = parsed.name;
          season.episodes = parsed.episodes;
        } catch (sfe) {
          season.error = sfe.toString();
        }
      })
    );

    seasons = seasons.filter((s) => s.episodes.length);
    seasons = seasons.map((s) => {
      delete s.isSelected;
      return s;
    });
  } catch (error) {}

  return {
    all_seasons: allSeasons.map((s) => ({
      id: s.id,
      name: `Season ${s.id}`,
      api_path: `/title/${id}/season/${s.id}`,
    })),
    seasons,
  };
}

export function parseEpisodes(raw, seasonId) {
  let parser = new DomParser();
  let dom = parser.parseFromString(raw);

  let name = dom.getElementById("episode_top").textContent.trim();
  name = entityDecoder(name, { level: "html5" });

  let episodes = [];

  let item = dom.getElementsByClassName("list_item");

  item.forEach((node, index) => {
    try {
      let image = null;
      let image_large = null;
      try {
        image = node.getElementsByTagName("img")[0];
        image = image.getAttribute("src");
        image_large = image.replace(/[.]_.*_[.]/, ".");
      } catch (_) {}

      let noStr = null;
      try {
        // noStr = node.getElementsByClassName("image")[0].textContent.trim();
        noStr = `S${seasonId}, Ep${index + 1}`;
      } catch (_) {}

      let publishedDate = null;
      try {
        publishedDate = node
          .getElementsByClassName("airdate")[0]
          .textContent.trim();
      } catch (_) {}

      let title = null;
      try {
        title = node.getElementsByTagName("a");
        title = title.find((t) => t.getAttribute("itemprop") === "name");
        title = title.textContent.trim();
        title = entityDecoder(title, { level: "html5" });
      } catch (_) {}

      let plot = null;
      try {
        plot = node.getElementsByTagName("div");
        plot = plot.find((t) => t.getAttribute("itemprop") === "description");
        plot = plot.textContent.trim();
        plot = entityDecoder(plot, { level: "html5" });
      } catch (_) {}

      let star = 0;
      try {
        star = node
          .getElementsByClassName("ipl-rating-star__rating")[0]
          .textContent.trim();
        star = parseFloat(star);
      } catch (_) {}

      let count = 0;
      try {
        count = node
          .getElementsByClassName("ipl-rating-star__total-votes")[0]
          .textContent.trim();
        count = count.replace(/[(]|[)]|,|[.]/g, "");
        count = parseInt(count);
      } catch (_) {}

      if (
        image.includes(`spinning-progress.gif`) &&
        plot.includes("Know what this is about")
      )
        return null;

      episodes.push({
        idx: index + 1,
        no: noStr,
        title,
        image,
        image_large,
        plot,
        publishedDate,
        rating: {
          count,
          star,
        },
      });
    } catch (ss) {
      console.log(ss.message);
    }
  });

  return {
    name: name,
    episodes: episodes,
  };
}
