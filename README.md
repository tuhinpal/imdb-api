![IMDB API](https://user-images.githubusercontent.com/51857187/170807293-a52d8141-f743-4501-82e5-55e3d4286e61.jpg)

## Features 🪶

- Search titles
- Search by IMDB ID
- Cacheable Result
- High Performance
- Get episode information

## Installation 📦

Installation is pretty easy and straight forward. Click the button below to get started.

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/tuhinpal/imdb-api)

- After deployed Open [Cloudflare Worker](https://workers.cloudflare.com "Cloudflare Worker") Page
- Click on KV
- In `Namespace Name` section Type a Name & Click on `Add`, a namespace will created.
- Now go back to worker main page, here you will see that your created worker listed there, click on that.
- Click on `Settings` > `Variables`
- In `KV Namespace Bindings` section click on `Add Binding`
- Write `CACHE` in Variable name & select your recently created Namespace for KV namespace.

## API 📡

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/12162111-12f08f8e-a76b-4cf4-a7b9-17cb9f95dd82?action=collection%2Ffork&collection-url=entityId%3D12162111-12f08f8e-a76b-4cf4-a7b9-17cb9f95dd82%26entityType%3Dcollection%26workspaceId%3Df96b67fc-548b-4248-af81-f654c97a867f)

- `/search?query={query}` for search by title - **[Try It](https://imdb-api.tprojects.workers.dev/search?query=Little%20Things)**
- `/title/{imdb_id}` get details of a title - **[Try It](https://imdb-api.tprojects.workers.dev/title/tt6522580)**

## License 🎯

- Licensed under [Apache-2.0](https://github.com/tuhinpal/imdb-api/blob/master/LICENSE)
- Made by [Tuhin Kanti Pal](https://github.com/tuhinpal)

### Have a good day 🤘
