import DomParser from "dom-parser";
import qs from "qs";
import apiRequestRawHtml from "../../helpers/apiRequestRawHtml";

const SORT_OPTIONS = {
  most_recent: "date_added,desc",
  oldest: "date_added,asc",
  top_rated: "your_rating,desc",
  worst_rated: "your_rating,asc",
};

export default async function userRating(c) {
  let errorStatus = 500;

  try {
    const userId = c.req.param("id");

    const sort =
      SORT_OPTIONS[c.req.query("sort") || ""] || Object.values(SORT_OPTIONS)[0];
    const ratingFilter = c.req.query("ratingFilter") || null;

    const query = qs.stringify({
      sort,
      ratingFilter: ratingFilter || undefined,
    });

    const constructedUrl = `https://www.imdb.com/user/${userId}/ratings?${query}`;

    const response = await fetch(constructedUrl, {
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
          ? "Seems like user rating is not exixts."
          : "Error fetching user rating."
      );
    }

    const rawHtml = await response.text();
    const parser = new DomParser();
    const dom = parser.parseFromString(rawHtml);

    let total_ratings = 0;
    let total_filtered_ratings = 0;
    let all_ratings = [];

    try {
      const totalRatings = rawHtml.match(/span> [(]of (\d+)[)] titles/)[1];
      total_ratings = parseInt(totalRatings);
    } catch (_) {}

    try {
      const totalFilteredRatings = dom.getElementById(
        "lister-header-current-size"
      ).textContent;
      total_filtered_ratings = parseInt(totalFilteredRatings);
    } catch (_) {}

    try {
      const listNode = dom.getElementById("ratings-container");
      const lists = listNode
        .getElementsByClassName("mode-detail")
        .slice(0, 100); // limit to 100

      for (const node of lists) {
        const parsed = parseContent(node);
        if (parsed) all_ratings.push(parsed);
      }
    } catch (_) {}

    const allReviews = await parseReviews(userId);

    // merge reviews
    all_ratings = all_ratings.map((rating) => {
      let review = allReviews.find((review) => review.title_id === rating.id);
      if (review) delete review.title_id;

      return {
        ...rating,
        review: review || null,
      };
    });

    const result = {
      id: userId,
      imdb: constructedUrl,
      user_api_path: `/user/${userId}`,
      allSortOptions: Object.keys(SORT_OPTIONS),
      allRatingFilters: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      total_user_ratings: total_ratings,
      total_filtered_ratings,
      ratings: all_ratings,
    };

    return c.json(result);
  } catch (error) {
    c.status(errorStatus);
    return c.json({
      message: error.message,
    });
  }
}

async function parseReviews(userId) {
  try {
    let data = [];
    const rawHtml = await apiRequestRawHtml(
      `https://www.imdb.com/user/${userId}/reviews`
    );

    const parser = new DomParser();
    const dom = parser.parseFromString(rawHtml);

    const allLists = dom.getElementsByClassName("lister-item");

    for (const node of allLists) {
      try {
        const id = node.getAttribute("data-review-id");
        const imdb = node.getAttribute("data-vote-url");
        const titleId = imdb.match(/title\/(.*)\/review/)[1];
        const reviewContent =
          node.getElementsByClassName("show-more__control")[0];
        const reviewTitle = node.getElementsByClassName("title")[0];

        let review_date = node
          .getElementsByClassName("review-date")[0]
          .textContent.trim();
        review_date = new Date(review_date).toISOString();

        data.push({
          title_id: titleId,

          id,
          date: review_date,
          heading: reviewTitle.textContent.trim(),
          content: reviewContent.textContent.trim(),
          reviewLink: `https://www.imdb.com/review/${id}`,
        });
      } catch (_) {
        console.error(`Reviews error:`, _);
      }
    }

    return data;
  } catch (error) {
    console.error(`Reviews error:`, error);
    return [];
  }
}

function parseContent(node) {
  try {
    let object = {};

    const nodeInnerHtml = node.innerHTML;
    const titleNode = node.getElementsByClassName("lister-item-header")[0];
    const title = titleNode.getElementsByTagName("a")[0];
    const titleUrl = title.getAttribute("href");
    const titleId = titleUrl.match(/title\/(.*)\//)[1];

    object.id = titleId;
    object.imdb = `https://www.imdb.com/title/${titleId}`;
    object.api_path = `/title/${titleId}`;
    object.review_api_path = `/reviews/${titleId}`;
    object.title = title.textContent.trim();

    const userRatingNode = node.getElementsByClassName(
      "ipl-rating-star--other-user"
    )[0];
    const userRating = userRatingNode.getElementsByClassName(
      "ipl-rating-star__rating"
    )[0];

    object.userRating = parseInt(userRating.textContent.trim());

    try {
      const ratedOn = nodeInnerHtml.match(/>Rated on (.*)<[\/]p>/)[1];
      object.date = new Date(ratedOn).toISOString();
    } catch (error) {
      object.date = null;
    }

    try {
      const plot = nodeInnerHtml.match(/<p class(?:=""|)>\s(.*)<[\/]p>/)[1];
      object.plot = plot.trim();
    } catch (error) {
      object.plot = null;
    }

    try {
      const image = node.getElementsByClassName("loadlate")[0];
      object.image = image.getAttribute("loadlate");
      object.image_large = object.image.replace(/._.*_/, "");
    } catch (error) {
      object.image = null;
      object.image_large = null;
    }

    try {
      const genre = node.getElementsByClassName("genre")[0].textContent;
      object.genre = genre.split(",").map((g) => g.trim());
    } catch (_) {
      object.genre = ["Error"];
    }

    try {
      const allUserRating = node.getElementsByClassName(
        "ipl-rating-star__rating"
      )[0];

      let votes = -1;
      try {
        votes = node.getElementsByName("nv")[0].getAttribute("data-value");
      } catch (__) {}

      object.rating = {
        star: parseFloat(allUserRating.textContent.trim()),
        count: parseInt(votes),
      };
    } catch (error) {
      object.rating = {
        count: -1,
        star: -1,
      };
    }

    try {
      object.contentRating =
        node.getElementsByClassName("certificate")[0].textContent;
    } catch (_) {
      object.contentRating = null;
    }

    try {
      object.runtime = node.getElementsByClassName("runtime")[0].textContent;
      object.runtimeSeconds = parseRuntimeIntoSeconds(object.runtime);
    } catch (_) {
      object.runtime = null;
      object.runtimeSeconds = -1;
    }

    return object;
  } catch (error) {
    console.log(error);
    return null;
  }
}

function parseRuntimeIntoSeconds(runtime) {
  try {
    let seconds = 0;

    const hrMatch = runtime.match(/(\d+)\shr/);
    if (hrMatch) {
      seconds += parseInt(hrMatch[1]) * 60 * 60;
    }

    const minMatch = runtime.match(/(\d+)\smin/);
    if (minMatch) {
      seconds += parseInt(minMatch[1]) * 60;
    }

    return Math.floor(seconds);
  } catch (error) {
    return -1;
  }
}
