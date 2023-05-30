import { NextFunction, Request, Response } from "express";

import Division from "../models/divisionModel";
import AppError from "../utils/appError";
import handlerFactory from "./handlerFactory";

const getDivision = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await Division.find().populate({
      path: "division",
      select: "-__v",
    });
    res.status(200).json({
      status: "Success",
      data: {
        data,
      },
    });
  } catch (error: any) {
    next(new AppError(error.message, 404));
  }
};

const createDivision = handlerFactory.createOne(Division);

export default { getDivision, createDivision };
