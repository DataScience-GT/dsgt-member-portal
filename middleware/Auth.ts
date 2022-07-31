import { Request, Response, NextFunction } from "express";
import { StatusError } from "../Classes/StatusError";

//dotenv

/**
 * Authenticates the reqeust by a bearer api token.
 */
const ApiAuthenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req && req.headers && req.headers.authorization) {
    if (req.headers.authorization.includes("Bearer ")) {
      let auth = req.headers.authorization.split(" ")[1];

      if (auth === process.env.API_KEY) {
        next();
      } else {
        let err = new StatusError("invalid bearer token", 401);
        next(err);
      }
    } else {
      let err = new StatusError(
        "authorization must be in the form of bearer token",
        400
      );
      next(err);
    }
  } else {
    let err = new StatusError("missing authorization header", 400);
    next(err);
  }
};

//--------------------- used for basic auth ---------------------

// const apiAuthenticate = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): void => {
//   if (req && req.headers && req.headers.authorization) {
//     let auth = Buffer.from(
//       req.headers.authorization.split(" ")[1],
//       "base64"
//     ).toString();

//     //auth = username:password
//     let key = auth.split(":")[0];
//     let pass = auth.split(":")[1];

//     if (
//       key === process.env.API_AUTH_KEY &&
//       pass === process.env.API_AUTH_PASS
//     ) {
//       next();
//     } else {
//       let err = new Error("invalid basic authorization");
//       next(err);
//     }
//   } else {
//     let err = new Error("missing authorization header");
//     next(err);
//   }
// };

export default ApiAuthenticate;
