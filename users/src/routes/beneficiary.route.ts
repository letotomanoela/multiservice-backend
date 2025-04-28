import { Router } from "express";
import {
  findMany,
  deleteUser,
  update,
  getOne,
  create,
} from "../controllers/benefiaciary.controller";
const beneficiaryRoute = Router();

beneficiaryRoute.get("/", findMany);
beneficiaryRoute.post("/", create);
beneficiaryRoute.delete("/:id", deleteUser);
beneficiaryRoute.put("/:id", update);
beneficiaryRoute.get("/:id", getOne);

export default beneficiaryRoute;
