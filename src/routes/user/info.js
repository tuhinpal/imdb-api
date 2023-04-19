import DomParser from "dom-parser";

export default async function userInfo(c) {
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
      const name = rawHtml.match(/<h1>(.*)<\/h1>/)[1];
      data.name = name || null;
    } catch (__) {
      data.name = null;
    }

    try {
      const created = rawHtml.match(
        /<div class="timestamp">IMDb member since (.*)<\/div>/
      )[1];
      data.member_since = created || null;
    } catch (__) {
      data.created = null;
    }

    try {
      let image = dom.getElementById("avatar");
      const imageSrc = image.getAttribute("src");

      if (imageSrc) {
        data.image = imageSrc.replace("._V1_SY100_SX100_", "");
      } else {
        data.image = null;
      }
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

    const result = Object.assign(
      {
        id: userId,
        imdb: `https://www.imdb.com/user/${userId}`,
        ratings_api_path: `/user/${userId}/ratings`,
      },
      data
    );

    return c.json(result);
  } catch (error) {
    c.status(errorStatus);
    return c.json({
      message: error.message,
    });
  }
}
