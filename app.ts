const path = require("node:path");

//setup express
import express, { Request, Response, NextFunction } from "express";
import errorMiddleware from "./middleware/ErrorMiddleware";
const app = express();

app.use("/api/webhook", express.raw({ type: "*/*" }));
app.use(express.json({ limit: "50mb" }));

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002"
]

const corsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200,
}

const cors = require("cors");
app.use(cors(corsOptions));

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

module.exports = app;
export default app;
