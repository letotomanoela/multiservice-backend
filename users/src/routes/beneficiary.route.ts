import { Router } from "express";
import { findMany } from "../controllers/benefiaciary.controller";
const beneficiaryRoute = Router();

beneficiaryRoute.get("/", findMany);

export default beneficiaryRoute;
