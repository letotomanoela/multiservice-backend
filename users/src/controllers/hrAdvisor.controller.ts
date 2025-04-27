import db from "../db";
import { RequestHandler } from "express";

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
