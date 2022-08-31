import express, { Request, Response, NextFunction } from "express";
import {
  ErrorPreset,
  StatusError,
  StatusErrorPreset,
} from "../Classes/StatusError";
import { getAllMembers } from "../model";
import { compareUserRoles } from "../RoleManagement";
import { checkSessionValid } from "../SessionManagement";
const { Parser } = require("json2csv");

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  res.send("welcome to the file api!");
});

router.get(
  "/members",
  async (req: Request, res: Response, next: NextFunction) => {
    let session_id = req.query.session_id?.toString();
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
    if (compareUserRoles(valid.role, "administrator") < 0) {
      next(new StatusErrorPreset(ErrorPreset.NoPermission));
      return;
    }
    //get data
    const user_data = await getAllMembers();

    try {
      var fields = Object.keys(user_data[0]);
      const opts = { fields };
      const parser = new Parser(opts);
      var data = parser.parse(user_data);

      // Send csv data to client
      res.attachment("filename.csv");
      res.status(200).send(data);
    } catch (err) {
      next(err);
      return;
    }
  }
);

export default router;
module.exports = router;
