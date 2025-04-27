import db from "../db";
import { RequestHandler } from "express";

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
