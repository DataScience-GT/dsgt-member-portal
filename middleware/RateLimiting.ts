//express
import { Request, Response, NextFunction } from "express";

//setup logger
import { log, warning, error } from "../Logger";

const RateLimit = (req: Request, res: Response, next: NextFunction) => {
  var ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  console.log(ip);
  
  next();
};

export default RateLimit;
