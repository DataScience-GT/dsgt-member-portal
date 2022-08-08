const path = require("node:path");

//setup express
import express, { Request, Response, NextFunction } from "express";
import errorMiddleware from "./middleware/ErrorMiddleware";
const app = express();

app.use("/api/webhook", express.raw({ type: "*/*" }));
app.use(express.json({ limit: "50mb" }));

//load .env
require("dotenv").config();

const PORT = process.env.PORT || 4211;

//setup logger
// import { log, warning, error } from "./Logger";

// setup routes
const api = require("./routes/api");

app.use("/api", api);

// error handler middleware
app.use(errorMiddleware);

// setup static react build
app.use(express.static(path.join(__dirname, "../client", "build")));
app.get("/*", (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
});

// app.get("/*", (req: Request, res: Response, next: NextFunction) => {
//     res.send("hello world");
// });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
