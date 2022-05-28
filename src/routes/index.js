import { Hono } from "hono";
const index = new Hono();
import packageJson from "../../package.json";

index.get("/", async (c) => {
  return c.json({
    status: "Running",
    name: packageJson.name,
    description: packageJson.description,
    version: packageJson.version,
    repository: packageJson.homepage,
    author: packageJson.author,
    license: packageJson.license,
    postman:
      "https://www.postman.com/tuhin-pal/workspace/imdb-api/collection/12162111-12f08f8e-a76b-4cf4-a7b9-17cb9f95dd82?action=share&creator=12162111",
    postman_collection_json:
      "https://www.getpostman.com/collections/c261b9abc6b2a4b5f1c8",
  });
});

export default index;
