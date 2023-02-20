import config from "../../config";

export default async function cache(c, next) {
  const key = c.req.url;
  const cache = await caches.default;
  const response = await cache.match(key);

  function getCacheTTL() {
    try {
      let url = key.toString().toLowerCase();
      if (url.includes("/reviews")) return 60 * 60 * 24;
      if (url.includes("/title")) return 60 * 60 * 24;
      if (url.includes("/search")) return 60 * 60 * 24 * 2;
    } catch (_) {}

    return 86400;
  }

  if (!response) {
    await next();

    if (c.res.status === 200 && !config.cacheDisabled) {
      c.res.headers.append("Cache-Control", `public, max-age=${getCacheTTL()}`);
      const response = c.res.clone();
      await cache.put(key, response);
    }

    return;
  } else {
    c.res = response.clone();
    return;
  }
}
