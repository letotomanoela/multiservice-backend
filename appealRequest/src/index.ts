import { Hono } from "hono";
import db from "./db";
import { appealRequest } from "./db/schema";
import { eq } from "drizzle-orm";

const app = new Hono();

app.get("/api/appealRequest", async (c) => {
  const data = await db.query.appealRequest.findMany();
  const fullData: any[] = [];
  try {
    const getEmployes = await fetch("http://localhost:4000/api/employes");
    const getHrAdvisor = await fetch("http://localhost:4000/api/hrAdvisor");
    const employes = await getEmployes.json();
    const hrAdvisor = await getHrAdvisor.json();

    data.map((item) => {
      const employesData = employes.find(
        (employes: any) => employes.employesId === item.employesId
      );
      const hrAdvisorData = hrAdvisor.find(
        (hrAdvisor: any) => hrAdvisor.hrAdvisorId === item.hrAdvisorId
      );
      fullData.push({
        ...item,
        employes: employesData,
        hrAdvisor: hrAdvisorData,
      });
    });
  } catch (error) {
    data.map((item) => {
      fullData.push({
        ...item,
        employes: "Could not fetch data",
        hrAdvisor: "Could not fetch data",
      });
    });
  }

  return c.json(fullData);
});

app.get("/api/appealRequest/:id", async (c) => {
  const id = c.req.param("id");
  const data = await db.query.appealRequest.findFirst({
    where: (appealRequest, { eq }) => eq(appealRequest.requestId, id),
  });

  let fullData = {};

  try {
    const getEmployes = await fetch(
      `http://localhost:4000/api/employes/${data?.employesId}`
    );
    const getHrAdvisor = await fetch(
      `http://localhost:4000/api/hrAdvisor/${data?.hrAdvisorId}`
    );
    const employes = await getEmployes.json();
    const hrAdvisor = await getHrAdvisor.json();
    fullData = {
      ...data,
      employes,
      hrAdvisor,
    };
  } catch (error) {
    fullData = {
      ...data,
      employes: "Could not fetch data",
      hrAdvisor: "Could not fetch data",
    };
  }

  return c.json(fullData);
});

app.post("/api/appealRequest", async (c) => {
  const data = await c.req.json();
  try {
    // Verify employesId and hrAdvisorId
    const getEmployes = await fetch(
      `http://localhost:4000/api/employes/${data.employesId}`
    );

    const employes = await getEmployes.json();
    if (!employes) {
      return c.json({ error: "Employes not found" }, 404);
    }
    const newData = await db.insert(appealRequest).values(data);
  } catch (error) {
    return c.json({ error: "Could not verify the employe" }, 500);
  }
});

app.put("/api/appealReaquest/approve/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();

  // Verify hrAdvisorId
  const getHrAdvisor = await fetch(
    `http://localhost:4000/api/hrAdvisor/${body.hrAdvisorId}`
  );
  const hrAdvisor = await getHrAdvisor.json();
  if (!hrAdvisor) {
    return c.json({ error: "HrAdvisor not found" }, 404);
  }

  const data = await db
    .update(appealRequest)
    .set({
      requestStatus: "approved",
      hrAdvisorId: body.hrAdvisorId,
    })
    .where(eq(appealRequest.requestId, id));
  return c.json(data);
});

app.put("/api/appealReaquest/reject/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  // Verify hrAdvisorId
  const getHrAdvisor = await fetch(
    `http://localhost:4000/api/hrAdvisor/${body.hrAdvisorId}`
  );
  const hrAdvisor = await getHrAdvisor.json();
  if (!hrAdvisor) {
    return c.json({ error: "HrAdvisor not found" }, 404);
  }

  const data = await db
    .update(appealRequest)
    .set({
      requestStatus: "rejected",
      hrAdvisorId: body.hrAdvisorId,
    })
    .where(eq(appealRequest.requestId, id));

  return c.json(data);
});

export default app;
