import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import xss from "xss-clean";

import errorHandler from "./controllers/errorController";
import currencyRouter from "./routes/currencyRoutes";
import divisionRouter from "./routes/divisionRoutes";

const app: Express = express();

// Setup env configuration
dotenv.config();

// 1) Setting Security Header
app.use(helmet());

// 2) Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request, please try again in a hour",
});

// Applying limit to same IP
app.use("/api", limiter);

// express request body parser
app.use(express.json());

// Data Sanitize against NoSql query injection
app.use(mongoSanitize());

// Data Sanitize against XSS
app.use(xss());

app.use("/api/v1/divisions", divisionRouter);
app.use("/api/v1/currency", currencyRouter);

// Error Handler(Middleware)
app.use(errorHandler);

export default app;
