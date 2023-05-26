import express, { Router } from "express";

import divisionController from "../controllers/divisionController";

const router: Router = express.Router();

router.get("/", divisionController.getDivision);

export default router;
