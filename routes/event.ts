import express, { Request, Response, NextFunction } from "express";
import { ErrorPreset, StatusErrorPreset } from "../Classes/StatusError";
import { Event } from "../interfaces/Event";
import { createEvent, getEvents } from "../model";
import { compareUserRoles } from "../RoleManagement";
import { checkSessionValid } from "../SessionManagement";
const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("welcome to the event api!");
});

router.post("/get", async (req: Request, res: Response, next: NextFunction) => {
  let events = await getEvents();
  res.send({ ok: 1, data: events });
});

router.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    let session_id = req.body.session_id;
    if (!session_id) {
      next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
      return;
    }
    let e: Event = {
      name: req.body.name,
      location: req.body.location,
      imageData: req.body.imageData,
      startDate: req.body.startDate,
      startTime: req.body.startTime,
      endDate: req.body.endDate,
      endTime: req.body.endTime,
      shortDescription: req.body.shortDescription,
      longDescription: req.body.longDescription,
      link: req.body.link,
      enabled: req.body.enabled,
    };
    if (e.startDate) {
      let d = new Date(`${e.startDate} ${e.startTime || "12:00"} EST`);
      e.startISO = d.toISOString();
    }
    if (e.endDate) {
      let d = new Date(`${e.endDate} ${e.endTime || "12:00"} EST`);
      e.endISO = d.toISOString();
    }
    //check for missing fields
    if (!(e.name && e.shortDescription && e.imageData)) {
      next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
      return;
    }

    let valid = await checkSessionValid(session_id, next);
    if (valid && valid.valid) {
      //check if user has perms
      if (compareUserRoles(valid.role, "administrator") >= 0) {
        //insert event
        await createEvent(e);
        res.json({ ok: 1 });
      } else {
        next(new StatusErrorPreset(ErrorPreset.NoPermission));
      }
    } else {
      next(new StatusErrorPreset(ErrorPreset.SessionNotValid));
    }
  }
);

export default router;
module.exports = router;
