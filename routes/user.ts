import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

import { apiAuthenticate } from "../Auth";
import { getUsers } from "../model";
import { User } from "../interfaces/User";

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("welcome to the user api!");
});

router.get(
  "/get",
  apiAuthenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    const x = await getUsers();
    res.json({ ok: 1, data: x });
    // res.json(x);
  }
);

router.post("/register", (req: Request, res: Response, next: NextFunction) => {
  let u: User = {
    email: req.body.email,
    fname: req.body.fname,
    lname: req.body.lname,
    password: req.body.password,
  };
  res.json({ ok: 1, user: u });
});

router.post("/login", (req: Request, res: Response, next: NextFunction) => {
  res.json({ ok: 1 });
});

router.post("/update", (req: Request, res: Response, next: NextFunction) => {
  res.json({ ok: 1 });
});

router.delete("/remove", (req: Request, res: Response, next: NextFunction) => {
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
