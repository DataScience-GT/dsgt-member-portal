import { Request, Response, NextFunction } from "express";

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
        let err = new Error("invalid bearer token");
        next(err);
      }
    } else {
      let err = new Error("authorization must be in the form of bearer token");
      next(err);
    }
  } else {
    let err = new Error("missing authorization header");
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
