import { Router } from "express";
import { findMany } from "../controllers/hrAdvisor.controller";

const hrAdvisorRoute = Router();

hrAdvisorRoute.get("/", findMany);

export default hrAdvisorRoute;
