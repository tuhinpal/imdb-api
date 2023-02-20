import config from "../../config";

export default function cache({ cacheControl = "" } = {}) {
  return async (c, next) => {
    const key = c.req.url;
    const cache = await caches.default;
    const response = await cache.match(key);

    if (!response) {
      await next();

      if (c.res.status === 200 && !config.cacheDisabled) {
        if (cacheControl) c.res.headers.append("Cache-Control", cacheControl);
        const response = c.res.clone();
        await cache.put(key, response);
      }

      return;
    } else {
      c.res = response.clone();
      return;
    }
  };
}
