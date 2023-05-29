import express, { Router } from "express";

import currencyController from "../controllers/currencyController";

const router: Router = express.Router();

router.route("/").post(currencyController.createCurrency);

export default router;
