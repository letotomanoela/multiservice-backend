import { Hono } from "hono";
import db from "./db";
import { changeRequest, informations } from "./db/schema";

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
    const getHrAdvisor = await fetch("http://users:4000/api/hrAdvisor");
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

app.post("/api/changeRequest", async (c) => {
  const body = await c.req.json();
  const data = await db.insert(changeRequest).values(body).returning();
  return c.json(data);
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
      `http://users:4000/api/hrAdvisor/${data?.hrAdvisorId}`
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
      `http://users:4000/api/beneficiary/${body.beneficiaryId}`
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
  const id = c.req.param("id");
  const data = await db.query.informations.findFirst({
    where: (informations, { eq }) => eq(informations.changeRequestId, id),
  });

  if (!data) {
    return c.json({
      message: "No data found",
    });
  }

  try {
    const getBeneficiary = await fetch(
      `http://users:4000/api/beneficiary/${data?.beneficiaryId}`
    );
    const beneficiary = await getBeneficiary.json();
    if (!beneficiary) {
      return c.json({
        message: "Beneficiary not found",
      });
    }

    const updateBeneficiary = await fetch(
      `http://users:4000/api/beneficiary/${data?.beneficiaryId}`,
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

    const notificationText = `
      Beneficiary ${beneficiary?.fullname} that has the id ${data?.beneficiaryId} has been updated. \n
      The change request has been applied.
      Before the name was ${beneficiary?.user.fullname} and now it is ${data?.beneficiaryName}. \n
      Before the email was ${beneficiary?.user.email} and now it is ${data?.beneficiaryEmail}. \n
      Before the phone was ${beneficiary?.user.phone} and now it is ${data?.beneficiaryPhone}. \n
      Before the address was ${beneficiary?.user.address} and now it is ${data?.beneficiaryAddress}. \n
    `;

    await fetch("http://notifications:4002/api/notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        notifContent: notificationText,
        changeRequestId: data?.changeRequestId,
      }),
    });

    return c.json(beneficiaryUpdated);
  } catch (error) {
    return c.json({
      message: "Could not fetch beneficiary",
    });
  }
});

export default app;
