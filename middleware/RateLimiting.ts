const requestIp = require("request-ip");

//express
import { Request, Response, NextFunction } from "express";

//setup logger
import { log, warning, error } from "../Logger";

//db fns
import {
  insertApiRequest,
  getCountUserRequestsWithinTimeframe,
} from "../model";

const RateLimit = async (req: Request, res: Response, next: NextFunction) => {
  const clientIp = requestIp.getClientIp(req);
  //save the request
  const path = req.originalUrl as string;

  //get the rate limiting data
  let rate = rates.find((x) => x.path == path);
  if (path && rate) {
    let x = await getCountUserRequestsWithinTimeframe(
      clientIp,
      path,
      rate.timeframe
    );
    let countRecent = x[0].count;
    if (countRecent >= rate.limit) {
      //block the request
      next(new Error("Too many requests. Please wait between requests."));
    } else {
      await insertApiRequest(clientIp, path);
      next();
    }
  } else {
    await insertApiRequest(clientIp, path);
    next();
  }
};

export default RateLimit;

interface Rate {
  path: string;
  limit: number;
  timeframe: number;
}

const rates: Rate[] = [
  {
    path: "/api/ip",
    limit: 1,
    timeframe: 1000 * 60,
  },
];
