import { NextFunction, Request, Response } from "express";
import { Model } from "mongoose";

import AppError from "../utils/appError";

const deleteOne = (Model: Model<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doc = await Model.findByIdAndDelete(req.params.id);

      if (!doc) next(Error("there is problem deleting the record"));

      res.status(204).json({
        status: "success",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  };
};

const updateOne = (Model: Model<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      res.status(200).json({
        status: "success",
        data: {
          data: doc,
        },
      });
    } catch (error) {
      next(error);
    }
  };
};

const createOne = (Model: Model<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doc = await Model.create(req.body);

      res.status(201).json({
        status: "success",
        data: {
          data: doc,
        },
      });
    } catch (error: any) {
      next(new AppError(error.message, 404));
    }
  };
};

// const getOne = (Model, popOption) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       let query = Model.findById(req.params.id);
//       if (popOption) query = query.populate(popOption);
//       const doc = await query;
//       //Model.findOne({key: value})

//       res.status(200).json({
//         status: "success",
//         data: {
//           data: doc,
//         },
//       });
//     } catch (error) {
//       next(error);
//     }
//   };
// };

// const getAll = (Model) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const filter = {};
//       if (req.params.tourId) filter.tour = req.params.tourId; // for getting reviews of specific tour

//       console.log(req.query);
//       const features = new APIFeatures(Model.find(filter), req.query)
//         .filter()
//         .sort()
//         .limitFields()
//         .paginate();

//       // Execute Query
//       const doc = await features.queryResult;

//       // Send res
//       res.status(200).json({
//         status: "success",
//         reqedAt: req.reqTime,
//         length: doc.length,
//         data: {
//           data: doc,
//         },
//       });
//     } catch (error) {
//       next(error);
//     }
//   };
// };

export default { createOne };
