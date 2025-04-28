import db from "../db";
import { RequestHandler } from "express";
import { hrAdvisor, users } from "../db/schemas";
import { eq } from "drizzle-orm";

export const findMany: RequestHandler = async (req, res, next) => {
  const hrAdvisors = await db.query.hrAdvisor
    .findMany({
      with: {
        user: true,
      },
    })
    .then((res) =>
      res.map((item) => {
        return {
          ...item.user,
          hrAdvisorId: item.hrAdvisorId,
        };
      })
    );
  res.status(200).json(hrAdvisors);
};

export const create: RequestHandler = async (req, res, next) => {
  const body = req.body;
  const addUser = await db.insert(users).values(body).returning();
  const addHrAdvisor = await db.insert(hrAdvisor).values({
    usersId: addUser[0].usersId,
  });

  res.status(200).json({
    message: "User created successfully",
    user: addUser[0],
    hrAdvisor: addHrAdvisor,
  });
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  await db.delete(hrAdvisor).where(eq(hrAdvisor.hrAdvisorId, id));
  res.status(200).json({
    message: "User deleted successfully",
  });
};

export const update: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  const findUser = await db.query.hrAdvisor.findFirst({
    where: (hrAdvisor, { eq }) => eq(hrAdvisor.hrAdvisorId, id),
  });

  await db
    .update(users)
    .set(body)
    .where(eq(users.usersId, findUser?.usersId as string));
  res.status(200).json({
    message: "User updated successfully",
  });
};

export const getOne: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const findUser = await db.query.hrAdvisor.findFirst({
    where: (hrAdvisor, { eq }) => eq(hrAdvisor.hrAdvisorId, id),
    with: {
      user: true,
    },
  });

  res.status(200).json(findUser);
};
