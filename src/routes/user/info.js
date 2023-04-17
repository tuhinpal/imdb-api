import { Hono } from "hono";
import DomParser from "dom-parser";
const userInfo = new Hono();

userInfo.get("/:id", async (c) => {
  let errorStatus = 500;

  try {
    const userId = c.req.param("id");
    const response = await fetch(`https://www.imdb.com/user/${userId}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
        accept: "text/html",
        "accept-language": "en-US",
      },
    });

    if (!response.ok) {
      errorStatus = response.status;
      throw new Error(
        errorStatus === 404
          ? "Seems like user is not exixts."
          : "Error fetching user info."
      );
    }

    const rawHtml = await response.text();
    const parser = new DomParser();
    const dom = parser.parseFromString(rawHtml);

    let data = {};

    try {
      let header = dom.getElementsByClassName("header")[0];

      try {
        let name = header.getElementsByTagName("h1")[0];
        data.name = name.textContent || null;
      } catch (__) {
        data.name = null;
      }

      try {
        let created = header.getElementsByClassName("timestamp")[0];
        data.created = created.textContent || null;
      } catch (__) {
        data.created = null;
      }
    } catch (_) {}

    try {
      let image = dom.getElementById("avatar");
      console.log(image);
      data.image = image.src || null;
    } catch (__) {
      data.image = null;
    }

    try {
      let badges = dom.getElementsByClassName("badges")[0];
      let mappedBadges = badges.childNodes
        .map((node) => {
          try {
            return {
              name: node.getElementsByClassName("name")[0].textContent,
              value: node.getElementsByClassName("value")[0].textContent,
            };
          } catch (__) {}
        })
        .filter(Boolean);

      data.badges = mappedBadges;
    } catch (_) {
      data.badges = [];
    }

    return c.json({
      userId,
      message: "User info fetched successfully.",
      data,
    });
  } catch (error) {
    c.status(errorStatus);
    return c.json({
      message: error.message,
    });
  }
});

export default userInfo;
