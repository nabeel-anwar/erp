import { NextFunction, Request, Response } from "express";

import Division from "../models/divisionModel";

const getDivision = async (req: Request, res: Response) => {
  try {
    const data = await Division.find().populate({
      path: "division",
      select: "-__v -_id",
    });
    res.status(200).json({
      status: "Success",
      message: "this route is not yet defined",
      data: {
        data,
      },
    });
  } catch (error) {}
};

const createDivision = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const doc = await Division.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default { getDivision, createDivision };
