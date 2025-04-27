import { Hono } from "hono";
import db from "./db";

const app = new Hono();

app.get("/api/appealRequest", async (c) => {
  const data = await db.query.appealRequest.findMany();
  return c.json(data);
});

export default app;
