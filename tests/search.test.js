const axios = require("axios");

test("test search route", async () => {
  let data = await axios.get(
    "http://localhost:8787/search?query=Rise Roar Revolt"
  );

  expect(data.status).toBe(200);
  expect(data.data.results.length).not.toBe(0);
  expect(typeof data.data.message).toBe("undefined");
});
