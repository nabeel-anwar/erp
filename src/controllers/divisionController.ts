import { Request, Response } from "express";

import Division from "../models/divisionModel";
import handlerFactory from "./handlerFactory";

const getDivision = async (req: Request, res: Response) => {
  try {
    const data = await Division.find().populate({
      path: "division",
      select: "-__v",
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

const createDivision = handlerFactory.createOne(Division);

export default { getDivision, createDivision };
