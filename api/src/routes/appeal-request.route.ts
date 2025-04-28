import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { z } from "zod";

export const app = new OpenAPIHono();

const appealRequestRoutes = createRoute({
  method: "get",
  path: "/",
  responses: {
    200: {
      description: "GET ALL APPEAL REQUESTS",
    },
  },
  tags: ["APPEAL_REQUEST"],
  summary: "Get all appeal requests",
});

const appealRequestGetOneRoute = createRoute({
  method: "get",
  path: "/:id",
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
  },
  responses: {
    200: {
      description: "GET AN APPEAL REQUEST",
    },
  },
  tags: ["APPEAL_REQUEST"],
  summary: "Get a specific appeal request",
});

const appealRequestCreateRoute = createRoute({
  method: "post",
  path: "/",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            employeId: z.string().uuid(),
            requestType: z.enum(["leave", "promotion", "other"]).optional(),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "CREATE AN APPEAL REQUEST",
    },
    404: {
      description: "EMPLOYEE NOT FOUND",
    },
    500: {
      description: "SERVER ERROR",
    },
  },
  tags: ["APPEAL_REQUEST"],
  summary: "Create a new appeal request",
});

const appealRequestApproveRoute = createRoute({
  method: "put",
  path: "/approve/:id",
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
    body: {
      content: {
        "application/json": {
          schema: z.object({
            hrAdvisorId: z.string().uuid(),
            changeRequestId: z.string().uuid().optional(),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "APPROVE AN APPEAL REQUEST",
    },
    404: {
      description: "HR ADVISOR NOT FOUND",
    },
  },
  tags: ["APPEAL_REQUEST"],
  summary: "Approve an appeal request",
});

const appealRequestRejectRoute = createRoute({
  method: "put",
  path: "/reject/:id",
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
    body: {
      content: {
        "application/json": {
          schema: z.object({
            hrAdvisorId: z.string().uuid(),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "REJECT AN APPEAL REQUEST",
    },
    404: {
      description: "HR ADVISOR NOT FOUND",
    },
  },
  tags: ["APPEAL_REQUEST"],
  summary: "Reject an appeal request",
});

app.openapi(appealRequestRoutes, async (c) => {
  const res = await fetch("http://appeal-request:4001/api/appealRequest");
  const data = await res.json();
  return c.json(data);
});

app.openapi(appealRequestGetOneRoute, async (c) => {
  const id = c.req.param("id");
  const res = await fetch(`http://appeal-request:4001/api/appealRequest/${id}`);
  const data = await res.json();
  return c.json(data);
});
app.openapi(appealRequestCreateRoute, async (c) => {
  const body = await c.req.json();
  const res = await fetch("http://appeal-request:4001/api/appealRequest", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return c.json(data);
});
app.openapi(appealRequestApproveRoute, async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const res = await fetch(
    `http://appeal-request:4001/api/appealReaquest/approve/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  const data = await res.json();
  return c.json(data);
});

app.openapi(appealRequestRejectRoute, async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const res = await fetch(
    `http://appeal-request:4001/api/appealReaquest/reject/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  const data = await res.json();
  return c.json(data);
});

export default app;
