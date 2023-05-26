import { Request, Response } from "express";

const getDivision = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      status: "Success",
      message: "this route is not yet defined",
      data: {},
    });
  } catch (error) {}
};

export default { getDivision };
