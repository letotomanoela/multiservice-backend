import { Hono } from "hono";
import db from "./db";

const app = new Hono();

app.get("/api/notification", async (c) => {
  const data = await db.query.notification.findMany();
  return c.json(data);
});

export default app;
