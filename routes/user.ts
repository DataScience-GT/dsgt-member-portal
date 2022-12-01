import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

//get crypto
const crypto = require("crypto");

//get qrcode
const qrcode = require("qrcode");

import RateLimit from "../middleware/RateLimiting";
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
  Sort,
  initiatePasswordReset,
  getPasswordResets,
  attemptPasswordReset,
  deleteUser,
  getAllMembersWithEmailOn,
  getUserLastLoggedOn,
  getAllMembers,
} from "../model";
import { RegisterUser, LoginUser, User } from "../interfaces/User";
import { compareUserRoles } from "../RoleManagement";
import { checkSessionValid } from "../SessionManagement";
import {
  ErrorPreset,
  StatusError,
  StatusErrorPreset,
} from "../Classes/StatusError";
import path from "path";
import { getPasswordResetEmail } from "../EmailTemplates/PasswordReset";
import { sendEmail } from "../email";

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("welcome to the user api!");
});

router.post(
  "/get",
  RateLimit(100, 1000 * 60),
  async (req: Request, res: Response, next: NextFunction) => {
    let session_id = req.body.session_id;
    // let sendToEmail = req.body.sendEmail;
    if (!session_id) {
      next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
      return;
    }
    let sorts;
    if (req.body.sorts) {
      sorts = JSON.parse(req.body.sorts) as Sort[];
    }
    let valid = await checkSessionValid(session_id, next);
    if (valid && valid.valid) {
      // Check if permissions exist
      if (compareUserRoles(valid.role, "administrator") >= 0) {
        const allUsers = await getUsers(sorts);
        // const verifiedUsers = await getAllMembersWithEmailOn();
        for (let user of allUsers) {
          user.last_logged_on = await getUserLastLoggedOn(user.user_id);
        }
        // if (sendToEmail) {
        //   res.json({ ok: 1, data: verifiedUsers });
        // } else {
        // }
        res.json({ ok: 1, data: allUsers });
      } else {
        next(new StatusErrorPreset(ErrorPreset.NoPermission));
      }
    } else {
      next(new StatusErrorPreset(ErrorPreset.SessionNotValid));
    }
  }
);

router.post(
  "/self",
  RateLimit(10, 1000 * 60),
  async (req: Request, res: Response, next: NextFunction) => {
    let session_id = req.body.session_id;
    if (!session_id) {
      next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
      return;
    }
    let valid = await checkSessionValid(session_id, next);
    if (valid && valid.valid) {
      //check if has enough perms
      res.json({ ok: 1, data: valid });
    } else {
      next(new StatusErrorPreset(ErrorPreset.SessionNotValid));
    }
  }
);

router.post(
  "/register",
  RateLimit(10, 1000 * 60),
  async (req: Request, res: Response, next: NextFunction) => {
    let u: RegisterUser = {
      email: req.body.email,
      fname: req.body.fname,
      lname: req.body.lname,
      password: req.body.password,
      major: req.body.major,
      minor: req.body.minor,
      gtEmail: req.body.gtEmail,
      personalEmail: req.body.personalEmail,
      newMember: req.body.newMember,
      studyYear: req.body.studyYear,
      gender: req.body.gender,
      ethnicity: req.body.ethnicity,
      location: req.body.location,
      experience: req.body.experience,
      interests: req.body.interests,
      hearAbout: req.body.hearAbout,
      emailConsent: req.body.emailConsent,
    };
    if (
      !(
        u.email &&
        u.fname &&
        u.lname &&
        u.password &&
        u.major &&
        u.gtEmail &&
        u.newMember &&
        u.studyYear &&
        u.gender &&
        u.ethnicity &&
        u.location &&
        u.experience &&
        u.interests &&
        u.hearAbout &&
        u.emailConsent
      )
    ) {
      next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
      return;
    }
    u.email = u.email.toLowerCase();
    let emailUsed = await checkUserEmail(u.email);
    if (emailUsed) {
      next(
        new StatusError(
          "An account with that email has already been registered.",
          400
        )
      );
      return;
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
  RateLimit(10, 1000 * 60),
  async (req: Request, res: Response, next: NextFunction) => {
    let u: LoginUser = {
      email: req.body.email,
      password: req.body.password,
    };
    if (!(u.email && u.password)) {
      next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
      return;
    }
    u.email = u.email.toLowerCase();
    let emailUsed = await checkUserEmail(u.email);
    if (!emailUsed) {
      next(new StatusError("An account with that email does not exist.", 404));
    } else {
      //check if account enabled
      if (!(await getUserEnabled(u.email))) {
        //disabled
        next(new StatusError("This account has been disabled.", 401));
        return;
      }
      let x = await loginUser(u);

      if (x) {
        //login success -- generate session key
        let sessionKey = generateSessionKey(32);
        await createSession({ user_id: x.user_inc, session_id: sessionKey });
        res.json({ ok: 1, session_key: sessionKey, role: x.role });
      } else {
        next(new StatusError("Invalid login credentials.", 401));
      }
    }
  }
);

router.post(
  "/update",
  RateLimit(10, 1000 * 60),
  async (req: Request, res: Response, next: NextFunction) => {
    //check body for props
    let session_key = req.body.session_id;
    let u_email = req.body.user_email;
    let u_role = req.body.user_role;
    let u_password = req.body.user_password;
    let u_fname = req.body.user_fname;
    let u_lname = req.body.user_lname;
    let u_enabled = req.body.user_enabled;
    if (!session_key) {
      //required fields
      next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
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
      next(new StatusError("Missing field(s) to update", 400));
      return;
    }
    //check if authorized to edit user
    let session_valid = await checkSessionValid(session_key, next);
    if (!session_valid || !session_valid.valid) {
      next(new StatusErrorPreset(ErrorPreset.SessionNotValid));
      return;
    }

    if (!u_email) {
      u_email = session_valid.email;
    }

    let session_role = session_valid?.role || "Guest";
    //validateSession() returns user role -- compare to other user role
    if (!(await checkUserEmail(u_email.toLowerCase()))) {
      next(new StatusError("User with that email does not exist", 404));
    }
    let user_role = await getUserRole(u_email);
    let valid = compareUserRoles(session_role, user_role);
    if (valid > 0) {
      //valid
      //check if new role is valid
      if (u_role && compareUserRoles(session_role, u_role) < 0) {
        //attempting to make the new role higher than current
        next(
          new StatusError("Cannot set user's role higher than own role", 401)
        );
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
          next(new StatusError("Cannot modify own role.", 401));
          return;
        }
        if (u_enabled) {
          next(new StatusError("Cannot re-enable own account.", 401));
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
        next(
          new StatusError(
            "You do not have permission to update this user.",
            401
          )
        );
        return;
      }
    }
    //update user
  }
);

router.post(
  "/resetpassword/get",
  RateLimit(3, 1000 * 60),
  async (req: Request, res: Response, next: NextFunction) => {
    // Initiate a password reset
    // Generate a random code
    let x = await getPasswordResets();
    res.json({ ok: 1, data: x });
  }
);

router.post(
  "/resetpassword/initiate",
  RateLimit(10, 1000 * 60),
  async (req: Request, res: Response, next: NextFunction) => {
    let email = req.body.email;
    if (!email) {
      next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
      return;
    }
    // Check if email exists
    let exists = await checkUserEmail(email, true);
    if (!exists) {
      next(new StatusError("Account with that email does not exist.", 404));
      return;
    }
    // Initiate a password reset
    // Generate a random code
    let x = await initiatePasswordReset(email);
    if (!x) {
      next(
        new StatusError("Failed to generate reset code. Try again later.", 500)
      );
      return;
    }
    // DO NOT SEND THIS CODE BACK TO THE REQ -- EMAIL TO THE EMAIL GIVEN
    // Get the recovery link
    let host =
      process.env.NODE_ENV == "development"
        ? req.get("host")
        : "https://member.datasciencegt.org";
    let recovery_url = `${host}/passwordreset?reset_code=${x}`;
    // Send the email with link
    let emailToSend = getPasswordResetEmail(recovery_url);
    await sendEmail(email, "Password Recovery", null, emailToSend, next);
    res.json({ ok: 1 });
  }
);

router.post(
  "/resetpassword/complete",
  RateLimit(3, 1000 * 60),
  async (req: Request, res: Response, next: NextFunction) => {
    let reset_code = req.body.reset_code;
    let new_password = req.body.new_password;
    if (!reset_code || !new_password) {
      next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
      return;
    }
    //complete the password reset
    let x = await attemptPasswordReset(reset_code, new_password, next);
    if (!res.headersSent) {
      res.json({ ok: 1 });
    }
  }
);

router.delete(
  "/remove",
  async (req: Request, res: Response, next: NextFunction) => {
    let user_email = req.body.email;
    if (!user_email) {
      next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
      return;
    }
    await deleteUser(user_email);
    res.json({ ok: 1 });
  }
);

router.post(
  "/qrcode",
  RateLimit(20, 1000 * 60),
  async (req: Request, res: Response, next: NextFunction) => {
    let session_id = req.body.session_id;
    if (!session_id) {
      next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
      return;
    }
    //generate a qrcode img
    let session = await checkSessionValid(session_id, next);
    if (session && session.valid) {
      //check if has enough perms
      qrcode.toDataURL(session.uuid, function (err: Error, url: string) {
        if (err) {
          next(err);
          return;
        }
        res.json({ ok: 1, qrcode: url });
      });
    } else {
      next(new StatusErrorPreset(ErrorPreset.SessionNotValid));
    }
  }
);

const generateSessionKey = (length: number): string => {
  //create session token
  let session_id: string = crypto.randomBytes(length).toString("hex");
  return session_id;
};

module.exports = router;
export default router;
