import app from "./app";

const port = process.env.port || 3000;

const server = app.listen(port, () => {
  console.log("Server listening on port 3000");
});
