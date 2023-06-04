import { Types } from "mongoose";

export interface Division {
  parent?: Types.ObjectId;
  currency?: Types.ObjectId;
  name?: string;
}
