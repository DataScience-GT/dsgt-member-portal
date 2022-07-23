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
  validateSession,
  getUserRole,
  updateUser,
  getUserEnabled,
} from "../model";
import { RegisterUser, LoginUser, User } from "../interfaces/User";
import { compareUserRoles } from "../RoleManagement";
import { checkSessionValid } from "../SessionManagement";

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
      res.json({ ok: 1, session_key: sessionKey, role: "member" });
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
      //check if account enabled
      if (!(await getUserEnabled(u.email))) {
        //disabled
        next(new Error("This account has been disabled."));
        return;
      }
      let x = await loginUser(u);

      if (x) {
        //login success -- generate session key
        let sessionKey = generateSessionKey(32);
        await createSession({ user_id: x.user_inc, session_id: sessionKey });
        res.json({ ok: 1, session_key: sessionKey, role: x.role });
      } else {
        next(new Error("Invalid login credentials."));
      }
    }
  }
);

router.post(
  "/update",
  async (req: Request, res: Response, next: NextFunction) => {
    //check body for props
    let session_key = req.body.session_id;
    let u_email = req.body.user_email;
    let u_role = req.body.user_role;
    let u_password = req.body.user_password;
    let u_fname = req.body.user_fname;
    let u_lname = req.body.user_lname;
    let u_enabled = req.body.user_enabled;
    if (!u_email || !session_key) {
      //required fields
      next(new Error("Missing 1 or more required fields"));
      return;
    }
    let count_changed = 0;
    if (u_role !== undefined) count_changed++;
    if (u_password !== undefined) count_changed++;
    if (u_fname !== undefined) count_changed++;
    if (u_lname !== undefined) count_changed++;
    if (u_enabled !== undefined) count_changed++;
    if (count_changed <= 0) {
      //missing fields to change
      next(new Error("Missing field(s) to update"));
      return;
    }
    //check if authorized to edit user
    let session_valid = await checkSessionValid(session_key, next);
    let session_role = session_valid?.role || "Guest";
    //validateSession() returns user role -- compare to other user role
    if (!(await checkUserEmail(u_email.toLowerCase()))) {
      next(new Error("User with that email does not exist"));
    }
    let user_role = await getUserRole(u_email);
    let valid = compareUserRoles(session_role, user_role);
    if (valid > 0) {
      //valid
      //check if new role is valid
      if (u_role && compareUserRoles(session_role, u_role) < 0) {
        //attempting to make the new role higher than current
        next(new Error("Cannot set user's role higher than own role"));
        return;
      }
      //update their info
      let u: User = {
        email: u_email,
        fname: u_fname,
        lname: u_lname,
        password: u_password,
        role: u_role,
        enabled: u_enabled,
      };
      await updateUser(u);
      res.json({
        ok: 1,
      });
    } else {
      //not valid
      //check if modifying self
      if (session_valid?.email === u_email) {
        //we are modifying ourselves
        if (u_role) {
          next(new Error("Cannot modify own role."));
          return;
        }
        if (u_enabled) {
          next(new Error("Cannot re-enable own account."));
          return;
        }
        //update self info
        let u: User = {
          email: u_email,
          fname: u_fname,
          lname: u_lname,
          password: u_password,
          enabled: u_enabled,
        };
        await updateUser(u);
        res.json({
          ok: 1,
        });
      } else {
        next(new Error("You do not have permission to update this user."));
        return;
      }
    }
    //update user
  }
);

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
