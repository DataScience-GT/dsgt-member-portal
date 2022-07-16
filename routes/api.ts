import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

import { apiAuthenticate } from "../Auth";

//setup /api/user
const user = require("./user");
router.use("/user", apiAuthenticate, user);

//setup /api/session
const session = require("./session");
router.use("/session", apiAuthenticate, session);

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

// router.get("/login", (req: Request, res: Response, next: NextFunction) => {
//   // let auth = req.headers.authorization;

//   console.log(req.body);
//   console.log(req.headers);
//   console.log(req.query);
//   console.log(req.params);

//   res.json({ ok: 1 });
// });

module.exports = router;
