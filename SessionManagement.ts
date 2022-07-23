import { NextFunction } from "express";
import { validateSession } from "./model";

type SessionValidation = {
  ok: number;
  valid: boolean;
  fname: string;
  email: string;
  user_id: number;
  role: string;
};

export const checkSessionValid = async (
  session_id: string,
  next: NextFunction
) => {
  let x = await validateSession(session_id);
  if (!x) {
    next(new Error("Session not found"));
  } else {
    let session_created_at = new Date(x.created_at);
    let now = new Date();
    let dif_ms = now.getTime() - session_created_at.getTime();
    let dif_s = dif_ms / 1000;
    let dif_m = dif_s / 60;
    let dif_h = dif_m / 60;
    let timeout = process.env.SESSION_TIMEOUT_H;
    if (x.enabled && dif_h < parseFloat(timeout || "2")) {
      let v: SessionValidation = {
        ok: 1,
        valid: true,
        fname: x.fname,
        email: x.email,
        user_id: x.user_id,
        role: x.role,
      };
      return v;
    } else {
      let v: SessionValidation = {
        ok: 1,
        valid: false,
        fname: x.fname,
        email: x.email,
        user_id: x.user_id,
        role: x.role,
      };
      return v;
    }
  }
};
