import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

//get crypto
const crypto = require("crypto");

import {
  getUsers,
  registerUser,
  checkUserEmail,
  loginUser,
  createSession,
} from "../model";
import { RegisterUser, LoginUser } from "../interfaces/User";

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("welcome to the user api!");
});

router.get("/get", async (req: Request, res: Response, next: NextFunction) => {
  const x = await getUsers();
  res.json({ ok: 1, data: x });
  // res.json(x);
});

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
    u.email = u.email.toLowerCase();
    u.fname = u.fname.toLowerCase();
    u.lname = u.lname.toLowerCase();
    let emailUsed = await checkUserEmail(u.email);
    if (emailUsed) {
      next(
        new Error("An account with that email has already been registered.")
      );
    } else {
      let x = await registerUser(u, next);
      //login success -- generate session key
      let sessionKey = generateSessionKey(32);
      await createSession({ user_id: x, session_id: sessionKey });
      res.json({ ok: 1, session_key: sessionKey });
    }
  }
);

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    let u: LoginUser = {
      email: req.body.email,
      password: req.body.password,
    };
    if (!(u.email && u.password)) {
      next(new Error("Missing 1 or more required fields."));
      return;
    }
    u.email = u.email.toLowerCase();
    let emailUsed = await checkUserEmail(u.email);
    if (!emailUsed) {
      next(new Error("An account with that email does not exist."));
    } else {
      let x = await loginUser(u);

      if (x) {
        //login success -- generate session key
        let sessionKey = generateSessionKey(32);
        await createSession({ user_id: x, session_id: sessionKey });
        res.json({ ok: 1, session_key: sessionKey });
      } else {
        next(new Error("Invalid login credentials."));
      }
    }
  }
);

router.post("/update", (req: Request, res: Response, next: NextFunction) => {
  res.json({ ok: 1 });
});

router.delete("/remove", (req: Request, res: Response, next: NextFunction) => {
  res.json({ ok: 1 });
});

const generateSessionKey = (length: number): string => {
  //create session token
  let session_id: string = crypto.randomBytes(length).toString("hex");
  return session_id;
};

module.exports = router;
export default router;
