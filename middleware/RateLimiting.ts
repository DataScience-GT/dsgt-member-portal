const requestIp = require("request-ip");

//express
import { Request, Response, NextFunction } from "express";
import { StatusError } from "../Classes/StatusError";

//setup logger
import { log, warning, error } from "../Logger";

//db fns
import {
  insertApiRequest,
  getCountUserRequestsWithinTimeframe,
} from "../model";

/**
 * allows or blocks requests based on rate limiting. Set both parameters to undefined to only log the request, but not ratelimit.
 * @Note If combined with ApiAuthenticate, do this middleware 2nd. Check auth first.
 * @param rate_limit the number of requests allowed within the timeframe
 * @param rate_timeframe the timeframe in MS to check for recent requests
 * @returns middleware function
 */
const RateLimit = (
  rate_limit: number | undefined,
  rate_timeframe: number | undefined
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // const clientIp = requestIp.getClientIp(req);
    // res.locals.clientIp = clientIp;
    // //save the request
    // const path = req.originalUrl as string;

    //get the rate limiting data
    // if (path && rate_limit && rate_timeframe) {
    //   let x = await getCountUserRequestsWithinTimeframe(
    //     clientIp,
    //     path,
    //     rate_timeframe
    //   );
    //   let countRecent = x[0].count;
    //   if (countRecent >= rate_limit) {
    //     //block the request
    //     next(
    //       new StatusError(
    //         "Too many requests. Please wait between requests.",
    //         429
    //       )
    //     );
    //   } else {
    //     await insertApiRequest(clientIp, path);
    //     next();
    //   }
    // } else {
    //   await insertApiRequest(clientIp, path);
    //   next();
    // }
    next();
  };
};

export default RateLimit;

// interface Rate {
//   path: string;
//   limit: number;
//   timeframe: number;
// }

// const rates: Rate[] = [
//   {
//     path: "/api/ip",
//     limit: 1,
//     timeframe: 1000 * 60,
//   },
// ];
