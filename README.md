![IMDB-API](https://firebasestorage.googleapis.com/v0/b/cdn-tuhin.appspot.com/o/16537056719q7?alt=media&token=6343c68a-fe99-4344-b5a5-838219e1067d)

## Features 🪶

- Search titles
- Search by IMDB ID
- Cacheable Result
- High Performance

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

- `/search={query}` for search by title
- `/title/{imdb_id}` get details of a title

## License 🎯

- Licensed under [Apache-2.0](https://github.com/tuhinpal/imdb-api/blob/master/LICENSE)
- Made by [Tuhin Kanti Pal](https://github.com/tuhinpal)

### Have a good day 🤘
