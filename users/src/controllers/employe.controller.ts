import db from "../db";
import { RequestHandler } from "express";
import { employes, users } from "../db/schemas";
import { eq } from "drizzle-orm";

export const findMany: RequestHandler = async (req, res, next) => {
  const employes = await db.query.employes
    .findMany({
      with: {
        user: true,
      },
    })
    .then((res) =>
      res.map((item) => {
        return {
          ...item.user,
          employeId: item.employesId,
        };
      })
    );

  res.status(200).json(employes);
};

export const create: RequestHandler = async (req, res, next) => {
  const body = req.body;
  const addUser = await db.insert(users).values(body).returning();
  const addEmployes = await db.insert(employes).values({
    usersId: addUser[0].usersId,
  });

  res.status(200).json({
    message: "User created successfully",
    user: addUser[0],
    employes: addEmployes,
  });
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  await db.delete(employes).where(eq(employes.employesId, id));
  res.status(200).json({
    message: "User deleted successfully",
  });
};

export const update: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  const findUser = await db.query.employes.findFirst({
    where: (employes, { eq }) => eq(employes.employesId, id),
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
  const findUser = await db.query.employes.findFirst({
    where: (employes, { eq }) => eq(employes.employesId, id),
    with: {
      user: true,
    },
  });

  res.status(200).json(findUser);
};
