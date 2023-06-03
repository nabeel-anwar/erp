import express, { Router } from "express";

import currencyController from "../controllers/currencyController";

const router: Router = express.Router();

router
  .route("/")
  .get(currencyController.getCurrency)
  .post(currencyController.createCurrency);

export default router;
