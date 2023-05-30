import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(err.statusCode).json({
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

export default errorHandler;
