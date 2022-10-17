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
/**
 * Gets all the events
 * @param {string} session_id (query, required) user's session id
 */
router.get(
  "/event/get",
  ValidateSession("query", "moderator"),
  async (req: Request, res: Response, next: NextFunction) => {
    let events = await getCheckinEvents();
    res.json({ ok: 1, data: events });
  }
);

/**
 * Creates a new event
 * @param {string} session_id (body, required) user's session id
 * @param {string} name (body, required) the name of the event
 */
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

/**
 * Deletes an event
 * @param {string} session_id (body, required) user's session id
 * @param {string} event_id (body, required) event id of the event to delete
 */
router.delete(
  "/event/delete",
  ValidateSession("body", "moderator"),
  async (req: Request, res: Response, next: NextFunction) => {
    let event_id = req.body.event_id;
    if (!event_id) {
      next(new StatusErrorPreset(ErrorPreset.MissingRequiredFields));
      return;
    }
    //attempt to delete the event
    await deleteCheckinEvent(event_id);
    res.json({ ok: 1 });
  }
);

//----------- users ------------
/**
 * Gets all the users for a particular event or for all events
 * @param {string} session_id (query, required) user's session id
 * @param {string} event_id (query, optional) event_id of the event
 */
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

/**
 * Checks in a user for an event
 * @param {string} session_id (body, required) user's session id
 * @param {string} uuid (body, required) user's uuid
 * @param {string} event_id (body, required) event_id of event to check in
 * 
 */
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
