import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import xss from "xss-clean";

const app: Express = express();

// Setup env configuration
dotenv.config({ path: "../config.env" });

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

export default app;
