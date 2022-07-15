import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

import { apiAuthenticate } from "../Auth";
import { getUsers, registerUser, checkUserEmail } from "../model";
import { User, RegisterUser } from "../interfaces/User";

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

router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    let u: RegisterUser = {
      email: req.body.email,
      fname: req.body.fname,
      lname: req.body.lname,
      password: req.body.password,
    };
    if (!(u.email && u.fname && u.lname && u.password)) {
      next(new Error("Missing 1 or more required fields."));
    }
    let emailUsed = await checkUserEmail(u.email);
    if (emailUsed) {
      next(
        new Error("An account with that email has already been registered.")
      );
    } else {
      await registerUser(u, next);
      res.json({ ok: 1 });
    }
  }
);

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
