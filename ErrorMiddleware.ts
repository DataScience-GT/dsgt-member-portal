//express
import { Request, Response, NextFunction } from "express";

//setup logger
import { log, warning, error } from "./Logger";

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.dir(req);
  error(`'${err.message}' at ${req.url}`);
  if (!res.headersSent) {
    res.status(400).send({ ok: 0, error: err.message });
  }
};

export default errorMiddleware;
