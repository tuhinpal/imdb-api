import { Hono } from "hono";
import routes from "@/routes";
import HttpError from "http-errors";

const app = new Hono();

app.route("/api", routes);

app.onError((err, c) => {
  return c.json(
    {
      message: err.message,
    },
    {
      status: HttpError.isHttpError(err) ? err.statusCode : 500,
    }
  );
});

export default app;
