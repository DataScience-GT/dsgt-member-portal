import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

import ApiAuthenticate from "../middleware/Auth";
import RateLimit from "../middleware/RateLimiting";

import { sendEmail } from "../email";

//setup /api/user
import user from "./user";
router.use("/user", ApiAuthenticate, user);

//setup /api/session
import session from "./session";
router.use("/session", ApiAuthenticate, session);

//setup /api/rates
import rates from "./rates";
router.use("/rates", ApiAuthenticate, rates);

//setup /api/announcement
import announcement from "./announcement";
router.use("/announcement", ApiAuthenticate, announcement);

//setup /api/webhook -- for payment webhooks
import webhook from "./webhook";
router.use("/webhook", webhook);

//setup /api/billing -- for billing details
import billing from "./billing";
router.use("/billing", ApiAuthenticate, billing);

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
  RateLimit(100, 1000 * 60), // 10 per minute
  (req: Request, res: Response, next: NextFunction) => {
    res.json({ ok: 1, ip: res.locals.clientIp });
  }
);

router.post(
  "/test",
  (req: Request, res: Response, next: NextFunction) => {
    
    res.json({ ok: 1, body: req.body });
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
