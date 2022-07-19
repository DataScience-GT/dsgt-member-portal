import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

import ApiAuthenticate from "../middleware/Auth";
import RateLimit from "../middleware/RateLimiting";

//setup /api/user
import user from "./user";
router.use("/user", ApiAuthenticate, RateLimit(5, 1000 * 60), user);

//setup /api/session
import session from "./session";
router.use("/session", ApiAuthenticate, RateLimit(5, 1000 * 60), session);

//setup /api/rates
import rates from "./rates";
router.use("/rates", ApiAuthenticate, RateLimit(5, 1000 * 60), rates);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("welcome to the api!");
});

router.get(
  "/auth",
  ApiAuthenticate,
  RateLimit(10, 1000 * 60), // 10 per minute
  (req: Request, res: Response, next: NextFunction) => {
    // let auth = req.headers.authorization;

    // res.send(apiAuthenticate(req));
    res.json({ ok: 1 });
  }
);

router.get(
  "/ip",
  ApiAuthenticate,
  RateLimit(10, 1000 * 60), // 10 per minute
  (req: Request, res: Response, next: NextFunction) => {
    res.json({ ok: 1, ip: res.locals.clientIp });
  }
);

// router.get("/login", (req: Request, res: Response, next: NextFunction) => {
//   // let auth = req.headers.authorization;

//   console.log(req.body);
//   console.log(req.headers);
//   console.log(req.query);
//   console.log(req.params);

//   res.json({ ok: 1 });
// });

module.exports = router;
