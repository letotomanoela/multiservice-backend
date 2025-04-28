import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { z } from "zod";

export const app = new OpenAPIHono();

// Notification routes
const notificationRoutes = createRoute({
  method: "get",
  path: "/",
  responses: {
    200: {
      description: "GET ALL NOTIFICATIONS",
    },
  },
  tags: ["NOTIFICATION"],
  summary: "Get all notifications",
});

const notificationCreateRoute = createRoute({
  method: "post",
  path: "/",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            notifContent: z.string(),
            changeRequestId: z.string().uuid().optional(),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "CREATE A NOTIFICATION",
    },
  },
  tags: ["NOTIFICATION"],
  summary: "Create a new notification",
});

app.openapi(notificationRoutes, async (c) => {
  const res = await fetch("http://notifications:4002/api/notification");
  const data = await res.json();
  return c.json(data);
});

app.openapi(notificationCreateRoute, async (c) => {
  const json = await c.req.json();
  const res = await fetch("http://notifications:4002/api/notification", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  });
  const data = await res.json();
  return c.json(data);
});

export default app;
