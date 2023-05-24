import express, { Express, Request, Response } from "express";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to erp project initial");
});

app.listen(1234, () => {
  console.log("running on port 1234");
});
