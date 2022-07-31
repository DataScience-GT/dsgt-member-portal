//express
import { Request, Response, NextFunction } from "express";
import { StatusError } from "../Classes/StatusError";

//setup logger
import { log, warning, error } from "../Logger";

const errorMiddleware = (
  err: Error | StatusError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let status_code = 500;
  if (err instanceof StatusError) {
    status_code = err.statusCode;
  }
  error(`'${err.message}' at ${req.url}`);
  if (!res.headersSent) {
    res.status(status_code).send({ ok: 0, error: err.message });
  }
};

export default errorMiddleware;
