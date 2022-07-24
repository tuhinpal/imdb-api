const axios = require("axios");

test("test title route movie", async () => {
  let data = await axios.get("http://localhost:8787/title/tt8178634");

  expect(data.status).toBe(200);
  expect(data.data.contentType).toBe("Movie");
  expect(Array.isArray(data.data.rating.count)).not.toBe(0);
  expect(Array.isArray(data.data.rating.star)).not.toBe(0);
  expect(Array.isArray(data.data.year)).not.toBe(null);
  expect(Array.isArray(data.data.runtime)).not.toBe(null);
  expect(Array.isArray(data.data.actors)).toBe(true);
  expect(Array.isArray(data.data.directors)).toBe(true);
});

test("test title route tvseries", async () => {
  let data = await axios.get("http://127.0.0.1:8787/title/tt5491994");

  expect(data.status).toBe(200);
  expect(data.data.contentType).toBe("TVSeries");
  expect(Array.isArray(data.data.rating.count)).not.toBe(0);
  expect(Array.isArray(data.data.rating.star)).not.toBe(0);
  expect(Array.isArray(data.data.actors)).toBe(true);
  expect(Array.isArray(data.data.directors)).toBe(true);
  expect(Array.isArray(data.data.seasons)).toBe(true);
  expect(data.data.seasons.length > 0).toBe(true);
});
