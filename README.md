![IMDB API](https://user-images.githubusercontent.com/51857187/170807293-a52d8141-f743-4501-82e5-55e3d4286e61.jpg)

📖 **Note**: `imdb-api.tprojects.workers.dev` is redirected to `imdb-api.tprojects.workers.dev`. Please update your api url to improve latency.

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

- `/search?query={query}` for search by title - **[Try It](https://imdb-api.projects.thetuhin.com/search?query=Little%20Things)**
- `/title/{imdb_id}` get details of a title - **[Try It](https://imdb-api.projects.thetuhin.com/title/tt6522580)**
- `/reviews/{imdb_id}?option={helpfulness|date|votes|rating}&sortOrder={asc|desc}` get reviews of a title - **[Try It](https://imdb-api.projects.thetuhin.com/reviews/tt6522580?option=date&sortOrder=desc)**
- `/title/{imdb_id}/season/{season_id}` fetch single season of a series - **[Try It](https://imdb-api.projects.thetuhin.com/title/tt6522580/season/4)**

## License 🎯

- Licensed under [Apache-2.0](https://github.com/tuhinpal/imdb-api/blob/master/LICENSE)
- Made by [Tuhin Kanti Pal](https://github.com/tuhinpal)

### Have a good day 🤘
