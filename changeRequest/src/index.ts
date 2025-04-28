import { Hono } from "hono";
import db from "./db";
import { informations } from "./db/schema";

const app = new Hono();

app.get("/api/changeRequest", async (c) => {
  const data = await db.query.changeRequest.findMany({
    with: {
      informations: true,
    },
  });

  const fullData: any[] = [];

  try {
    // get the hrAdvisors
    const getHrAdvisor = await fetch("http://localhost:4000/api/hrAdvisor");
    const hrAdvisor = await getHrAdvisor.json();

    data.map((item) => {
      const hrAdvisorData = hrAdvisor.find(
        (hrAdvisor: any) => hrAdvisor.hrAdvisorId === item.hrAdvisorId
      );
      fullData.push({
        ...item,
        hrAdvisor: hrAdvisorData,
      });
    });
  } catch (error) {
    data.map((item) => {
      fullData.push({
        ...item,
        hrAdvisor: "Could not fetch data",
      });
    });
  }

  return c.json(fullData);
});

app.get("/api/changeRequest/:id", async (c) => {
  const id = c.req.param("id");
  const data = await db.query.changeRequest.findFirst({
    where: (changeRequest, { eq }) => eq(changeRequest.changeRequestId, id),
    with: {
      informations: true,
    },
  });

  let fullData = {};

  try {
    // get the hrAdvisors
    const getHrAdvisor = await fetch(
      `http://localhost:4000/api/hrAdvisor/${data?.hrAdvisorId}`
    );
    const hrAdvisor = await getHrAdvisor.json();
    fullData = {
      ...data,
      hrAdvisor,
    };
  } catch (error) {
    fullData = {
      ...data,
      hrAdvisor: "Could not fetch data",
    };
  }

  return c.json(fullData);
});

app.post("api/changeRequest/informations", async (c) => {
  const body = await c.req.json();
  /** Verify if beneficiaryId exists */
  try {
    const getBeneficiary = await fetch(
      `http://localhost:4000/api/beneficiary/${body.beneficiaryId}`
    );
    const beneficiary = await getBeneficiary.json();
    if (!beneficiary) {
      return c.json({
        message: "Beneficiary not found",
      });
    }
  } catch (error) {
    return c.json({
      message: "Could not fetch beneficiary",
    });
  }
  const data = await db.insert(informations).values(body).returning();
  return c.json(data);
});

app.put("api/changeRequest/apply/:id", async (c) => {
  const body = await c.req.json();
  const id = c.req.param("id");
  const data = await db.query.informations.findFirst({
    where: (informations, { eq }) => eq(informations.changeRequestId, id),
  });

  try {
    const getBeneficiary = await fetch(
      `http://localhost:4000/api/beneficiary/${data?.beneficiaryId}`
    );
    const beneficiary = await getBeneficiary.json();
    if (!beneficiary) {
      return c.json({
        message: "Beneficiary not found",
      });
    }

    const updateBeneficiary = await fetch(
      `http://localhost:4000/api/beneficiary/${data?.beneficiaryId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: data?.beneficiaryName,
          email: data?.beneficiaryEmail,
          phone: data?.beneficiaryPhone,
          address: data?.beneficiaryAddress,
        }),
      }
    );
    const beneficiaryUpdated = await updateBeneficiary.json();
    return c.json(beneficiaryUpdated);
  } catch (error) {
    return c.json({
      message: "Could not fetch beneficiary",
    });
  }
});

export default app;
