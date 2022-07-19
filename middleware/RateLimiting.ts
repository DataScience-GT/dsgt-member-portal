const requestIp = require("request-ip");

//express
import { Request, Response, NextFunction } from "express";

//setup logger
import { log, warning, error } from "../Logger";

const RateLimit = (req: Request, res: Response, next: NextFunction) => {
  const clientIp = requestIp.getClientIp(req);
  //save the request
  const path = req.originalUrl;
  next();
};

export default RateLimit;
