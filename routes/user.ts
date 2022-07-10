import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

import { apiAuthenticate } from "../Auth";

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("welcome to the user api!");
});

router.get("/register", (req: Request, res: Response, next: NextFunction) => {
  res.json({ ok: 1 });
});

router.get("/login", (req: Request, res: Response, next: NextFunction) => {
  res.json({ ok: 1 });
});

router.get("/update", (req: Request, res: Response, next: NextFunction) => {
  res.json({ ok: 1 });
});

router.get("/remove", (req: Request, res: Response, next: NextFunction) => {
  res.json({ ok: 1 });
});



// router.get("/login", (req: Request, res: Response, next: NextFunction) => {
//   // let auth = req.headers.authorization;

//   console.log(req.body);
//   console.log(req.headers);
//   console.log(req.query);
//   console.log(req.params);

//   res.json({ ok: 1 });
// });

module.exports = router;
