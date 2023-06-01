import { NextFunction, Request, Response } from "express";

import Division from "../models/divisionModel";
import handlerFactory from "./handlerFactory";

const getDivision = handlerFactory.getAll(Division);

const createDivision = handlerFactory.createOne(Division);

export default { getDivision, createDivision };
