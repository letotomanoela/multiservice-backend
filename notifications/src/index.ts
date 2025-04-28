import { Hono } from "hono";
import db from "./db";
import { notification } from "./db/schema";

const app = new Hono();

app.get("/api/notification", async (c) => {
  const data = await db.query.notification.findMany();
  return c.json(data);
});

app.post("/api/notification", async (c) => {
  const body = await c.req.json();
  const data = await db.insert(notification).values(body).returning();
  return c.json(data);
});

export default app;
