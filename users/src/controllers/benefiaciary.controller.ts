import db from "../db";
import { RequestHandler } from "express";
import { users, beneficiary } from "../db/schemas";
import { eq } from "drizzle-orm";

export const findMany: RequestHandler = async (req, res, next) => {
  const beneficiaries = await db.query.beneficiary
    .findMany({
      with: {
        user: true,
      },
    })
    .then((res) =>
      res.map((item) => {
        return {
          ...item.user,
          beneficiaryId: item.beneficiaryId,
        };
      })
    );
  res.status(200).json(beneficiaries);
};

export const create: RequestHandler = async (req, res, next) => {
  const body = req.body;
  const addUser = await db.insert(users).values(body).returning();
  const addBeneficiary = await db.insert(beneficiary).values({
    usersId: addUser[0].usersId,
  });

  res.status(200).json({
    message: "User created successfully",
    user: addUser[0],
    beneficiary: addBeneficiary,
  });
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  await db.delete(beneficiary).where(eq(beneficiary.beneficiaryId, id));
  res.status(200).json({
    message: "User deleted successfully",
  });
};

export const update: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  const findUser = await db.query.beneficiary.findFirst({
    where: (beneficiary, { eq }) => eq(beneficiary.beneficiaryId, id),
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
  const findUser = await db.query.beneficiary.findFirst({
    where: (beneficiary, { eq }) => eq(beneficiary.beneficiaryId, id),
    with: {
      user: true,
    },
  });

  res.status(200).json(findUser);
};
