import { Router } from "express";
import { findMany } from "../controllers/employe.controller";

const employeRoute = Router();

employeRoute.get("/", findMany);
export default employeRoute;
