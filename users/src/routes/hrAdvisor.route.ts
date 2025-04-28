import { Router } from "express";
import {
  findMany,
  getOne,
  deleteUser,
  create,
  update,
} from "../controllers/hrAdvisor.controller";

const hrAdvisorRoute = Router();

hrAdvisorRoute.get("/", findMany);
hrAdvisorRoute.get("/:id", getOne);
hrAdvisorRoute.post("/", create);
hrAdvisorRoute.delete("/:id", deleteUser);
hrAdvisorRoute.put("/:id", update);

export default hrAdvisorRoute;
