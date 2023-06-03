import { query, Request } from "express";
import { Model, Query } from "mongoose";

class APIFeatures {
  public queryResult?: any;
  private modal: any;
  private queryObj: Request["query"];

  constructor(modal: any, queryObj: Request["query"]) {
    this.modal = modal; // Modal that find the data from DB
    this.queryObj = queryObj; // Object that create by express when get request coming with param
  }

  filter() {
    const queryObj = { ...this.queryObj };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // console.log(queryObj);
    // 1B) ADVANCED FILTERING
    // From { difficulty: 'easy', page: '2', price: { lte: '1500' } }
    // To { difficulty: 'easy', price: { $lte: '1500' } }

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    if (this.queryObj.search) {
      const searchString = this.queryObj.search; // getting search string
      let fields = Object.keys(this.modal.schema.paths); // getting documents keys to search

      fields = fields.filter((f) => f !== "_id" && f !== "__v"); // filter unnecessary key
      fields = fields.filter(
        (f) => this.modal.schema.paths[f].instance !== "ObjectId"
      ); // filter objectID keys (which is use to populate)

      const regexQuery = fields.map((field) => ({
        [field]: { $regex: searchString, $options: "i" },
      })); // creating fields array like: { name: { $regex: "searchString", $options: "i" } };

      this.queryResult = this.modal.find({ $or: regexQuery });
    } else {
      this.queryResult = this.modal.find(JSON.parse(queryStr));
    }

    return this;
  }

  sort() {
    if (this.queryObj.sort) {
      const sortBy = String(this.queryObj.sort).split(",").join(" ");
      this.queryResult = this.queryResult?.sort(sortBy);
    } else {
      // this.queryResult = this.queryResult.sort("-createdAt");
    }

    return this;
  }

  limitFields() {
    if (this.queryObj.fields) {
      const fields = String(this.queryObj.fields).split(",").join(" ");
      this.queryResult = this.queryResult?.select(fields);
    } else {
      this.queryResult = this.queryResult?.select("-__v");
    }

    return this;
  }

  paginate() {
    let limit: number;
    if (this.queryObj.page) {
      const page = +this.queryObj.page || 1;
      this.queryObj.limit ? (limit = +this.queryObj.limit) : (limit = 100);
      const skip = (page - 1) * limit;

      this.queryResult = this.queryResult?.skip(skip).limit(limit);

      // this.modal.countDocuments().then((numOfDoc: number) => {
      //   if (skip >= numOfDoc) {
      //     throw new Error("This page does not exist");
      //   }
      // });
    }

    return this;
  }
}

export default APIFeatures;
