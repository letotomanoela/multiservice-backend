import { serve } from "@hono/node-server";
import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import usersRoutes from "./routes/users.routes.ts";

const app = new OpenAPIHono();

app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "My API",
  },
});

app.route("/users", usersRoutes);

app.get("/scalar", Scalar({ url: "/doc", pageTitle: "RH API Reference" }));

app.get("/ui", swaggerUI({ url: "/doc" }));

const port = 5000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
