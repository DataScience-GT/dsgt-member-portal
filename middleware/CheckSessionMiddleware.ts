const requestIp = require("request-ip");

//express
import { Request, Response, NextFunction } from "express";
import {
  ErrorPreset,
  StatusError,
  StatusErrorPreset,
} from "../Classes/StatusError";

//setup logger
import { log, warning, error } from "../Logger";
import { compareUserRoles } from "../RoleManagement";
import { checkSessionValid } from "../SessionManagement";

const ValidateSession = (where: "query" | "body", required_role?: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    let session_id;

    if (where === "query") {
      session_id = req.query.session_id?.toString();
    } else if (where === "body") {
      session_id = req.body.session_id;
    }

    if (!session_id) {
      next(new StatusError(ErrorPreset.MissingRequiredFields));
      return;
    }
    //validate session
    let valid = await checkSessionValid(session_id, next);
    if (!(valid && valid.valid)) {
      next(new StatusErrorPreset(ErrorPreset.SessionNotValid));
      return;
    }
    if (required_role) {
      if (compareUserRoles(valid.role, required_role) < 0) {
        next(new StatusErrorPreset(ErrorPreset.NoPermission));
        return;
      }
    }
    next();
  };
};

export default ValidateSession;

// interface Rate {
//   path: string;
//   limit: number;
//   timeframe: number;
// }

// const rates: Rate[] = [
//   {
//     path: "/api/ip",
//     limit: 1,
//     timeframe: 1000 * 60,
//   },
// ];
