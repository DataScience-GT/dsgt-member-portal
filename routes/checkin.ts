import express, { Request, Response, NextFunction } from "express";
import {
  ErrorPreset,
  StatusError,
  StatusErrorPreset,
} from "../Classes/StatusError";
import ValidateSession from "../middleware/CheckSessionMiddleware";
import {
  checkinEventExists,
  checkInUser,
  checkUUIDExists,
  createCheckinEvent,
  deleteCheckinEvent,
  getCheckinEvents,
  getCheckinUsers,
  getUserFromUUID,
  isUserCheckedIn,
} from "../model";
import { compareUserRoles } from "../RoleManagement";
import { checkSessionValid } from "../SessionManagement";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  res.send("welcome to the checkin api!");
});

//----------- events ------------

router.get(
  "/event/get",
  ValidateSession("query", "moderator"),
  async (req: Request, res: Response, next: NextFunction) => {
    let events = await getCheckinEvents();
    res.json({ ok: 1, data: events });
  }
);

router.post(
  "/event/create",
  ValidateSession("body", "moderator"),
  async (req: Request, res: Response, next: NextFunction) => {
    let name = req.body.name;
    if (!name) {
      next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
      return;
    }
    let created_by: number = res.locals.session.user_id;
    //attempt to create the event
    await createCheckinEvent(name, created_by);
    res.json({ ok: 1 });
  }
);

router.delete(
  "/event/delete",
  ValidateSession("body", "moderator"),
  async (req: Request, res: Response, next: NextFunction) => {
    let event_id = req.body.event_id;
    if (!event_id) {
      next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
      return;
    }
    //attempt to create the event
    await deleteCheckinEvent(event_id);
    res.json({ ok: 1 });
  }
);

//----------- users ------------

router.get(
  "/users/get",
  ValidateSession("query", "moderator"),
  async (req: Request, res: Response, next: NextFunction) => {
    let event_id = req.query.event_id?.toString();
    let events;
    if (event_id) {
      events = await getCheckinUsers(parseInt(event_id));
    } else {
      events = await getCheckinUsers();
    }
    res.json({ ok: 1, data: events });
  }
);

router.post(
  "/user",
  ValidateSession("body", "moderator"),
  async (req: Request, res: Response, next: NextFunction) => {
    let uuid = req.body.uuid;
    let event_id = req.body.event_id;
    if (!(uuid && event_id)) {
      next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
      return;
    }
    let created_by: number = res.locals.session.user_id;

    //check if uuid exists
    let uuid_exists = await checkUUIDExists(uuid);
    if (!uuid_exists) {
      next(new StatusError("User not found, invalid QR code.", 404))
      return;
    }
    let user = await getUserFromUUID(uuid);
    //add check for event_id
    let event_exists = await checkinEventExists(event_id);
    if (!event_exists) {
      next(new Error("Event not found"));
      return;
    }

    //check if the user has already been checked in
    let checked_in = await isUserCheckedIn(event_id, user.user_id);
    if (checked_in) {
      next(
        new Error(`'${user.fname} ${user.lname}' has aleady been checked in.`)
      );
      return;
    }

    //attempt to check the user in
    await checkInUser(event_id, user.user_id, created_by);
    res.json({
      ok: 1,
      message: `'${user.fname} ${user.lname}' has been checked in!`,
    });
  }
);

export default router;
module.exports = router;
