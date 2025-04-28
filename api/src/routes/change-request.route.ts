import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { z } from "zod";

export const app = new OpenAPIHono();

const changeRequestRoutes = createRoute({
  method: "get",
  path: "/",
  responses: {
    200: {
      description: "GET ALL CHANGE REQUESTS",
    },
  },
  tags: ["CHANGE_REQUEST"],
  summary: "Get all change requests",
});

const changeRequestCreateRoute = createRoute({
  method: "post",
  path: "/",
  request: {
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
      description: "CREATE A CHANGE REQUEST",
    },
  },
  tags: ["CHANGE_REQUEST"],
  summary: "Create a new change request",
});

const changeRequestGetOneRoute = createRoute({
  method: "get",
  path: "/:id",
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
  },
  responses: {
    200: {
      description: "GET A CHANGE REQUEST",
    },
  },
  tags: ["CHANGE_REQUEST"],
  summary: "Get a specific change request",
});

const changeRequestInformationsRoute = createRoute({
  method: "post",
  path: "/informations",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            changeRequestId: z.string().uuid(),
            beneficiaryId: z.string().uuid(),
            beneficiaryName: z.string(),
            beneficiaryAddress: z.string().optional(),
            beneficiaryPhone: z.string().optional(),
            beneficiaryEmail: z.string().email().optional(),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "ADD INFORMATION TO CHANGE REQUEST",
    },
  },
  tags: ["CHANGE_REQUEST"],
  summary: "Add information to a change request",
});

const changeRequestApplyRoute = createRoute({
  method: "put",
  path: "/apply/:id",
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
  },
  responses: {
    200: {
      description: "APPLY CHANGE REQUEST",
    },
  },
  tags: ["CHANGE_REQUEST"],
  summary: "Apply changes from a change request",
});

app.openapi(changeRequestRoutes, async (c) => {
  const res = await fetch("http://change-request:4003/api/changeRequest");
  const data = await res.json();
  return c.json(data);
});

app.openapi(changeRequestCreateRoute, async (c) => {
  const body = await c.req.json();
  const res = await fetch("http://change-request:4003/api/changeRequest", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return c.json(data);
});
app.openapi(changeRequestGetOneRoute, async (c) => {
  const id = c.req.param("id");
  const res = await fetch(`http://change-request:4003/api/changeRequest/${id}`);
  const data = await res.json();
  return c.json(data);
});

app.openapi(changeRequestInformationsRoute, async (c) => {
  const body = await c.req.json();
  const res = await fetch(
    "http://change-request:4003/api/changeRequest/informations",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  const data = await res.json();
  return c.json(data);
});

app.openapi(changeRequestApplyRoute, async (c) => {
  const id = c.req.param("id");
  const res = await fetch(
    `http://change-request:4003/api/changeRequest/apply/${id}`,
    {
      method: "PUT",
    }
  );
  const data = await res.json();
  return c.json(data);
});

export default app;
