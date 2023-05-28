import express, { Router } from "express";

import divisionController from "../controllers/divisionController";

const router: Router = express.Router();

router
  .route("/")
  .get(divisionController.getDivision)
  .post(divisionController.createDivision);
export default router;
