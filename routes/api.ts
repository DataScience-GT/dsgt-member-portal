import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

import apiAuthenticate from "../middleware/Auth";
import RateLimit from "../middleware/RateLimiting";

//setup /api/user
import user from "./user";
router.use("/user", apiAuthenticate, user);

//setup /api/session
import session from "./session";
router.use("/session", apiAuthenticate, session);

//setup /api/rates
import rates from "./rates";
router.use("/rates", apiAuthenticate, rates);

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("welcome to the api!");
});

router.get(
  "/auth",
  apiAuthenticate,
  (req: Request, res: Response, next: NextFunction) => {
    // let auth = req.headers.authorization;

    // res.send(apiAuthenticate(req));
    res.json({ ok: 1 });
  }
);

router.get(
  "/ip",
  RateLimit,
  (req: Request, res: Response, next: NextFunction) => {
    res.json({ ok: 1 });
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
