import { connect } from "mongoose";

import app from "./app";

connect("mongodb://localhost:27017/erp")
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => {
    console.log("DB Error: ", err);
  });

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log("Server listening on port 3000");
});
