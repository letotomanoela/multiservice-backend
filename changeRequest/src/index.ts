import { Hono } from "hono";
import db from "./db";

const app = new Hono();

app.get("/api/changeRequest", async (c) => {
  const data = await db.query.changeRequest.findMany({
    with: {
      informations: true,
    },
  });
  return c.json(data);
});

export default app;
