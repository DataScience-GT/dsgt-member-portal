import express, { Request, Response, NextFunction } from "express";
import { ErrorPreset, StatusErrorPreset } from "../Classes/StatusError";
import { Form } from "../interfaces/Form";
import { createForm, deleteform, getForms } from "../model";
import { compareUserRoles } from "../RoleManagement";
import { checkSessionValid } from "../SessionManagement";
const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("welcome to the form api!");
});

router.get("/get", async (req: Request, res: Response, next: NextFunction) => {
  let countString = req.query.count?.toString();
  let count: number = 500;
  if (countString) {
    count = parseInt(countString);
  }
  let forms = await getForms(count);
  res.send({ ok: 1, data: forms });
});

router.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    let session_id = req.body.session_id;
    if (!session_id) {
      next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
      return;
    }
    let f: Form = {
      name: req.body.name,
      time: req.body.time,
      url: req.body.url,
    };
    if (!(f.name && f.url)) {
      next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
      return;
    }
    let valid = await checkSessionValid(session_id, next);
    if (valid && valid.valid) {
      //check if user has perms
      if (compareUserRoles(valid.role, "moderator") >= 0) {
        //insert event
        await createForm(f);
        res.json({ ok: 1 });
      } else {
        next(new StatusErrorPreset(ErrorPreset.NoPermission));
      }
    } else {
      next(new StatusErrorPreset(ErrorPreset.SessionNotValid));
    }
  }
);

router.delete(
  "/remove",
  async (req: Request, res: Response, next: NextFunction) => {
    let session_id = req.body.session_id;
    if (!session_id) {
      next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
      return;
    }
    let form_id = req.body.form_id;
    if (!form_id) {
      next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
      return;
    }
    let valid = await checkSessionValid(session_id, next);
    if (valid && valid.valid) {
      //check if user has perms
      if (compareUserRoles(valid.role, "moderator") >= 0) {
        //insert event
        await deleteform(form_id);
        res.json({ ok: 1 });
      } else {
        next(new StatusErrorPreset(ErrorPreset.NoPermission));
      }
    } else {
      next(new StatusErrorPreset(ErrorPreset.SessionNotValid));
    }
  }
);

module.exports = router;
export default router;
