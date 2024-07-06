## Important Update: Project Discontinued 🔔

IMDb has recently launched their [official API](https://developer.imdb.com/), providing developers with authorized access to their database. Given this development, I've made the decision to discontinue maintenance of this project for the following reasons:

1. To avoid potential conflicts with IMDb's terms of service and intellectual property rights.
2. To encourage the use of officially supported and maintained data sources.

Recommendations for users of this project:

1. Transition to IMDb's official API for the most up-to-date and reliable movie data.
2. Consider using alternative sources like TMDB (The Movie Database) API as another robust option.

This repository will be archived to preserve the code for reference purposes. Thank you to all contributors and users for your support throughout this project's lifespan.

For any questions or concerns, please refer to IMDb's developer documentation or explore TMDB's API offerings.

![IMDB API](https://user-images.githubusercontent.com/51857187/170807293-a52d8141-f743-4501-82e5-55e3d4286e61.jpg)

## Features 🪶

- Search titles
- Search by IMDB ID
- Cacheable Result
- High Performance
- Get episode information
- Get all reviews with full pagination supported

## Installation 📦

If you anticipate sending a large number of requests, it is recommended that you deploy your own Cloudflare worker. Installation is pretty easy and straight forward. Click the button below to get started.

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/tuhinpal/imdb-api)

After deployed, map the worker to a Domain Name to configure cache. Only Workers deployed to custom domains have access to functional cache operations.

## Run with docker 🐋

- Clone this repository
- Build the image
  ```
  docker build -t imdb-api .
  ```
- Start the process (Deatached)
  ```
  docker run -p 3000:3000 -it -d imdb-api
  ```

## API 📡

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/12162111-12f08f8e-a76b-4cf4-a7b9-17cb9f95dd82?action=collection%2Ffork&collection-url=entityId%3D12162111-12f08f8e-a76b-4cf4-a7b9-17cb9f95dd82%26entityType%3Dcollection%26workspaceId%3D7efe0056-efcd-49b1-bfd8-0854d36c1065)

| Endpoint                                                                                         | Method | Description                               | Example                                                                                       |
| ------------------------------------------------------------------------------------------------ | ------ | ----------------------------------------- | --------------------------------------------------------------------------------------------- |
| `/search?query={query}`                                                                          | GET    | Search titles by title                    | [Try It](https://imdb-api.projects.thetuhin.com/search?query=Little%20Things)                 |
| `/title/{imdb_id}`                                                                               | GET    | Get details of a title                    | [Try It](https://imdb-api.projects.thetuhin.com/title/tt6522580)                              |
| `/reviews/{imdb_id}?option={helpfulness\|date\|votes\|rating}&sortOrder={asc\|desc}`             | GET    | Get reviews of a title                    | [Try It](https://imdb-api.projects.thetuhin.com/reviews/tt6522580?option=date&sortOrder=desc) |
| `/title/{imdb_id}/season/{season_id}`                                                            | GET    | (New) Fetch a single season of a series   | [Try It](https://imdb-api.projects.thetuhin.com/title/tt6522580/season/4)                     |
| `/user/{user_id}`                                                                                | GET    | (New) Fetch an user's info                | [Try It](https://imdb-api.projects.thetuhin.com/user/ur82525142)                              |
| `/user/{user_id}/ratings?ratingFilter={1-10}&sort={most_recent\|oldest\|top_rated\|worst_rated}` | GET    | (New) Fetch an user's ratings and reviews | [Try It](https://imdb-api.projects.thetuhin.com/user/ur82525142/ratings)                      |

## License 🎯

- Licensed under [Apache-2.0](https://github.com/tuhinpal/imdb-api/blob/master/LICENSE)
- Made by [Tuhin Kanti Pal](https://github.com/tuhinpal)

### Have a good day 🤘
