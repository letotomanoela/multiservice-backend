import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { z } from "zod";

export const app = new OpenAPIHono();

// Beneficiary routes
const beneficiaryRoutes = createRoute({
  method: "get",
  path: "/beneficiary",
  responses: {
    200: {
      description: "GET ALL BENEFICIARIES",
    },
  },
  tags: ["BENEFICIARY"],
  summary: "Get all beneficiaries",
});

const beneficiaryCreateRoute = createRoute({
  method: "post",
  path: "/beneficiary",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            fullname: z.string(),
            email: z.string().email(),
            address: z.string(),
            phone: z.string(),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "CREATE A BENEFICIARY",
    },
  },
  tags: ["BENEFICIARY"],
  summary: "Create a new beneficiary",
});

const beneficiaryDeleteRoute = createRoute({
  method: "delete",
  path: "/beneficiary/:id",
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
  },
  responses: {
    200: {
      description: "DELETE A BENEFICIARY",
    },
  },
  tags: ["BENEFICIARY"],
  summary: "Delete a beneficiary",
});

const beneficiaryUpdateRoute = createRoute({
  method: "put",
  path: "/beneficiary/:id",
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
    body: {
      content: {
        "application/json": {
          schema: z.object({
            fullname: z.string().optional(),
            email: z.string().email().optional(),
            address: z.string().optional(),
            phone: z.string().optional(),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "UPDATE A BENEFICIARY",
    },
  },
  tags: ["BENEFICIARY"],
  summary: "Update a beneficiary",
});

const beneficiaryGetOneRoute = createRoute({
  method: "get",
  path: "/beneficiary/:id",
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
  },
  responses: {
    200: {
      description: "GET A BENEFICIARY",
    },
  },
  tags: ["BENEFICIARY"],
  summary: "Get a specific beneficiary",
});

// Employee routes
const employeRoutes = createRoute({
  method: "get",
  path: "/employe",
  responses: {
    200: {
      description: "GET ALL EMPLOYEES",
    },
  },
  tags: ["EMPLOYEE"],
  summary: "Get all employees",
});

const employeCreateRoute = createRoute({
  method: "post",
  path: "/employe",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            fullname: z.string(),
            email: z.string().email().optional(),
            address: z.string(),
            phone: z.string(),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "CREATE AN EMPLOYEE",
    },
  },
  tags: ["EMPLOYEE"],
  summary: "Create a new employee",
});

const employeDeleteRoute = createRoute({
  method: "delete",
  path: "/employe/:id",
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
  },
  responses: {
    200: {
      description: "DELETE AN EMPLOYEE",
    },
  },
  tags: ["EMPLOYEE"],
  summary: "Delete an employee",
});

const employeUpdateRoute = createRoute({
  method: "put",
  path: "/employe/:id",
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
    body: {
      content: {
        "application/json": {
          schema: z.object({
            fullname: z.string().optional(),
            email: z.string().email().optional(),
            address: z.string().optional(),
            phone: z.string().optional(),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "UPDATE AN EMPLOYEE",
    },
  },
  tags: ["EMPLOYEE"],
  summary: "Update an employee",
});

const employeGetOneRoute = createRoute({
  method: "get",
  path: "/employe/:id",
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
  },
  responses: {
    200: {
      description: "GET AN EMPLOYEE",
    },
  },
  tags: ["EMPLOYEE"],
  summary: "Get a specific employee",
});

// HR Advisor routes
const hrAdvisorRoutes = createRoute({
  method: "get",
  path: "/hrAdvisor",
  responses: {
    200: {
      description: "GET ALL HR ADVISORS",
    },
  },
  tags: ["HR_ADVISOR"],
  summary: "Get all HR advisors",
});

const hrAdvisorCreateRoute = createRoute({
  method: "post",
  path: "/hrAdvisor",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            fullname: z.string(),
            email: z.string().email().optional(),
            address: z.string(),
            phone: z.string(),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "CREATE AN HR ADVISOR",
    },
  },
  tags: ["HR_ADVISOR"],
  summary: "Create a new HR advisor",
});

const hrAdvisorDeleteRoute = createRoute({
  method: "delete",
  path: "/hrAdvisor/:id",
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
  },
  responses: {
    200: {
      description: "DELETE AN HR ADVISOR",
    },
  },
  tags: ["HR_ADVISOR"],
  summary: "Delete an HR advisor",
});

const hrAdvisorUpdateRoute = createRoute({
  method: "put",
  path: "/hrAdvisor/:id",
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
    body: {
      content: {
        "application/json": {
          schema: z.object({
            fullname: z.string().optional(),
            email: z.string().email().optional(),
            address: z.string().optional(),
            phone: z.string().optional(),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "UPDATE AN HR ADVISOR",
    },
  },
  tags: ["HR_ADVISOR"],
  summary: "Update an HR advisor",
});

const hrAdvisorGetOneRoute = createRoute({
  method: "get",
  path: "/hrAdvisor/:id",
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
  },
  responses: {
    200: {
      description: "GET AN HR ADVISOR",
    },
  },
  tags: ["HR_ADVISOR"],
  summary: "Get a specific HR advisor",
});

app.openapi(beneficiaryRoutes, async (c) => {
  const res = await fetch("http://users:4000/api/beneficiary");
  const data = await res.json();
  return c.json(data);
});
app.openapi(beneficiaryCreateRoute, async (c) => {
  const json = await c.req.json();
  const res = await fetch("http://users:4000/api/beneficiary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  });
  const data = await res.json();
  return c.json(data);
});

app.openapi(beneficiaryDeleteRoute, async (c) => {
  const { id } = c.req.valid("param");
  const res = await fetch(`http://users:4000/api/beneficiary/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return c.json(data);
});
app.openapi(beneficiaryUpdateRoute, async (c) => {
  const { id } = c.req.valid("param");
  const json = await c.req.json();
  const res = await fetch(`http://users:4000/api/beneficiary/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  });
  const data = await res.json();
  return c.json(data);
});

app.openapi(beneficiaryGetOneRoute, async (c) => {
  const { id } = c.req.valid("param");
  const res = await fetch(`http://users:4000/api/beneficiary/${id}`);
  const data = await res.json();
  return c.json(data);
});

app.openapi(employeRoutes, async (c) => {
  const res = await fetch("http://users:4000/api/employe");
  const data = await res.json();
  return c.json(data);
});

app.openapi(employeCreateRoute, async (c) => {
  const json = await c.req.json();
  const res = await fetch("http://users:4000/api/employe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  });
  const data = await res.json();
  return c.json(data);
});

app.openapi(employeDeleteRoute, async (c) => {
  const { id } = c.req.valid("param");
  const res = await fetch(`http://users:4000/api/employe/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return c.json(data);
});

app.openapi(employeUpdateRoute, async (c) => {
  const { id } = c.req.valid("param");
  const json = await c.req.json();
  const res = await fetch(`http://users:4000/api/employe/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  });
  const data = await res.json();
  return c.json(data);
});

app.openapi(employeGetOneRoute, async (c) => {
  const { id } = c.req.valid("param");
  const res = await fetch(`http://users:4000/api/employe/${id}`);
  const data = await res.json();
  return c.json(data);
});
app.openapi(hrAdvisorRoutes, async (c) => {
  const res = await fetch("http://users:4000/api/hrAdvisor");
  const data = await res.json();
  return c.json(data);
});
app.openapi(hrAdvisorCreateRoute, async (c) => {
  const json = await c.req.json();
  const res = await fetch("http://users:4000/api/hrAdvisor", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  });
  const data = await res.json();
  return c.json(data);
});

app.openapi(hrAdvisorDeleteRoute, async (c) => {
  const { id } = c.req.valid("param");
  const res = await fetch(`http://users:4000/api/hrAdvisor/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return c.json(data);
});

app.openapi(hrAdvisorUpdateRoute, async (c) => {
  const { id } = c.req.valid("param");
  const json = await c.req.json();
  const res = await fetch(`http://users:4000/api/hrAdvisor/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      body: JSON.stringify(json),
    },
  });
  const data = await res.json();
  return c.json(data);
});

app.openapi(hrAdvisorGetOneRoute, async (c) => {
  const { id } = c.req.valid("param");
  const res = await fetch(`http://users:4000/api/hrAdvisor/${id}`);
  const data = await res.json();
  return c.json(data);
});

export default app;
