import { Router } from "express";
import {
  findMany,
  getOne,
  deleteUser,
  create,
  update,
} from "../controllers/employe.controller";

const employeRoute = Router();

employeRoute.get("/", findMany);
employeRoute.post("/", create);
employeRoute.delete("/:id", deleteUser);
employeRoute.put("/:id", update);
employeRoute.get("/:id", getOne);
export default employeRoute;
