import { Types } from "mongoose";

export interface Division {
  parent?: Types.ObjectId;
  currency?: Types.ObjectId;
  name?: string;
}
export interface Currency {
  name?: string;
  symbol?: string;
  iso?: string;
}
