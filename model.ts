const db = require("./data/db-config");
const md5 = require("md5");

import { log, warning, error } from "./Logger";
import { User, RegisterUser, LoginUser } from "./interfaces/User";
import { NewSession } from "./interfaces/Session";
import e, { NextFunction } from "express";
import { BillingDetails } from "./interfaces/Stripe";
import { StatusError } from "./Classes/StatusError";
import { Event } from "./interfaces/Event";
import { Form } from "./interfaces/Form";
import { Feedback } from "./interfaces/Feedback";

import { Team, TeamMember } from "./interfaces/Team";
import { ListFormat } from "typescript";
import { sendEmail } from "./email";
import { ProjectApp, ProjectInfo } from "./interfaces/ProjectApp";

const crypto = require("crypto");

type ErrorWithMessage = {
  message: string;
};

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError));
  }
}

function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message;
}
//------------------------------------------------------------
//-------------------- all db operations ---------------------
//------------------------------------------------------------

// ---------------------- user ----------------------

export type Sort = {
  column: string;
  order: string;
};

type result_getUsers = {
  user_id: number;
  email: string;
  fname: string;
  lname: string;
  enabled: boolean;
  role: string;
  created_at: string;
  last_logged_on?: string;
};

/**
 * Gets a list of all the users from the database "user" table. 
 * An optional sorts argument can be passed to the function to get a list of users sorted in a specific order.
 * @param sorts optional argument used to sort the users
 * @returns Returns a list of users of the type result_getUsers
 */
export const getUsers = (sorts?: Sort[] | Sort): result_getUsers[] => {
  if (sorts) {
    return db
      .select(
        "user_inc as user_id",
        "email",
        "fname",
        "lname",
        "enabled",
        "role",
        "created_at"
      )
      .from("user")
      .orderBy(sorts);
  } else {
    return db
      .select(
        "user_inc as user_id",
        "email",
        "fname",
        "lname",
        "enabled",
        "role",
        "created_at"
      )
      .from("user");
  }
};

/**
 * Gets the last logged in time of a specific user.
 * It sorts all the sessions of a user in descending order and returns a single
 * record by limiting the response to 1.
 * @param user_id id of the user whose last logged on time we want
 * @returns the date and time of the last login of the user.
 */
export const getUserLastLoggedOn = async (user_id: number) => {
  let res = await db
    .select("created_at")
    .from("session")
    .where("user_id", user_id)
    .orderBy("created_at", "desc")
    .limit(1);
  if (!res || !res.length) {
    return false;
  } else {
    return res[0].created_at;
  }
};

/**
 * Registers a user. It is advised to use `checkUserEmail()` to make sure the email is unique.
 */
export const registerUser = async (user: RegisterUser, next: NextFunction) => {
  try {
    // add the user to the database
    let uuid = crypto.randomBytes(24).toString("hex");
    while (await checkUUIDExists(uuid)) {
      // regenerate new uuid until unique
      uuid = crypto.randomBytes(24).toString("hex");
    }
    let hash = md5(user.password);
    let accountStatus = user.paymentAmount == 1500 ? 1 : 2;
    await db
      .insert({
        email: user.email,
        fname: user.fname,
        lname: user.lname,
        password: hash,
        enabled: accountStatus,
        uuid: uuid,
        major: user.major,
        minor: user.minor,
        gtemail: user.gtEmail,
        personalemail: user.personalEmail,
        newmember: user.newMember,
        studyyear: user.studyYear,
        gender: user.gender,
        ethnicity: user.ethnicity,
        location: user.location,
        experience: user.experience,
        interests: JSON.stringify(user.interests),
        hear_about: user.hearAbout,
        email_consent: user.emailConsent,
      })
      .into("user");
    let res = await db
      .select("user_inc")
      .from("user")
      .where("email", user.email)
      .andWhere("password", hash);
    if (res.length <= 0) {
      return false;
    } else {
      return res[0].user_inc;
    }
  } catch (err) {
    next(err);
  }
};

/**
 * updates a user based on their email
 * @param param0 {User}
 */
export const updateUser = async ({
  email,
  fname,
  lname,
  password,
  enabled,
  role,
}: User) => {
  // update each if defined
  if (fname) {
    await db("user")
      .update({ fname: fname })
      .where("email", email)
      .orWhere("gtemail", email);
  }
  if (lname) {
    await db("user")
      .update({ lname: lname })
      .where("email", email)
      .orWhere("gtemail", email);
  }
  if (password) {
    let hash = md5(password);
    await db("user")
      .update({ password: hash })
      .where("email", email)
      .orWhere("gtemail", email);
  }
  if (role) {
    await db("user")
      .update({ role: role })
      .where("email", email)
      .orWhere("gtemail", email);
  }
  if (enabled !== undefined) {
    await db("user")
      .update({ enabled: enabled })
      .where("email", email)
      .orWhere("gtemail", email);
  }
};

/**
 * checks whether an email has been used already.
 * @param email string
 * @returns `true` if email has already been used, `false` otherwise
 */
export const checkUserEmail = async (email: string, onlyBase?: boolean) => {
  let res;
  if (onlyBase) {
    res = await db("user").count("*").where("email", email);
  } else {
    res = await db("user")
      .count("*")
      .where("email", email)
      .orWhere("gtemail", email);
  }

  if (parseInt(res[0].count)) {
    return true;
  }
  return false;
};

/**
 * checks a user's login credentials
 * @returns user_inc `number>0` if login worked, `false` otherwise
 */
export const loginUser = async ({ email, password }: Required<LoginUser>) => {
  let hash = md5(password);
  let res = await db("user")
    .select("user_inc", "role", "gtemail")
    .where({ email: email, password: hash })
    .orWhere({ gtemail: email, password: hash });
  // .andWhere("password", hash);
  if (res.length <= 0) {
    return false;
  } else {
    return res[0];
  }
};

/**
 * changes a user's password
 * @returns true if succeeded, false otherwise
 */
export const changeUserPassword = async (
  email: string,
  current_password: string,
  new_password: string
) => {
  let curr_hash = md5(current_password);
  let new_hash = md5(new_password);
  // Check if current password is correct
  let res = await db("user")
    .count("*")
    .where("email", email)
    .andWhere("password", curr_hash);
  if (res.length <= 0) {
    return false;
  } else {
    // Update password
    await db("user")
      .update({ password: new_hash })
      .where("email", email)
      .andWhere("password", curr_hash);
    return true;
  }
};

/**
 * gets whether a user account in enabled or not.
 * @Note pair with checkUserEmail() to make sure the email exists first.
 * @param email user's email
 * @returns enabled: NUMBER, 0 if it doesn't exist
 */
export const getUserEnabled = async (email: string) => {
  let res = await db("user")
    .select("enabled")
    .where("email", email)
    .orWhere("gtemail", email);
  if (!res.length) {
    return 0;
  } else {
    return res[0].enabled;
  }
};

/**
 * removes a user from the database
 * @param email {string}
 */
export const deleteUser = async (email: string) => {
  await db("user").where("email", email).del();
};

/**
 * disables all users with the "member" role (all base users)
 */
export const decrementMembers = async () => {
  await db("user").decrement("enabled", 1).where("role", "member");
};

/**
 * disables all users with the "member" role (all base users)
 */
export const disableAllMembers = async () => {
  await db("user").update({ enabled: 0 }).where("role", "member");
};

// ------------------- session -------------------

export const getSessions = async () => {
  return db.select("*").from("session");
};

/**
 * creates a new login session
 */
export const createSession = async ({
  user_id,
  session_id,
}: Required<NewSession>) => {
  //add session to db
  await db.insert({ user_id: user_id, session_id: session_id }).into("session");
};

/**
 * Validates a user's session token
 * @param session_id {string} the user's session id
 * @returns session.created_at, user_id, fname, session.enabled, role, email, uuid
 */
export const validateSession = async (session_id: string) => {
  let res = await db("session")
    .join("user", "user.user_inc", "=", "session.user_id")
    .select(
      "session.created_at",
      "session.user_id",
      "user.fname",
      "user.lname",
      "session.enabled",
      "user.role",
      "user.email",
      "user.gtemail",
      "user.uuid",
      "user.hear_about",
      "user.email_consent"
    )
    .where("session_id", session_id);
  if (res.length <= 0) {
    return false;
  } else {
    return res[0];
  }
};

// --------------- rate limiting ---------------
/**
 * gets all api requests
 * @returns json object
 */
export const getApiRequests = async () => {
  return db.select("*").from("ratelimiting");
};

/**
 * inserts an api request into the ratelimiting table
 * @param user_ip the ip of the user making the request
 * @param pathname the path of the request (ex: /api/auth )
 */
export const insertApiRequest = async (user_ip: string, pathname: string) => {
  await db("ratelimiting").insert({ from_ip: user_ip, pathname: pathname });
};

/**
 * gets the count of requests made by a user of a specific path in the last period of time.
 * @param user_ip
 * @param pathname
 * @param time the last x milliseconds to check for requests
 */
export const getCountUserRequestsWithinTimeframe = async (
  user_ip: string,
  pathname: string,
  time: number
) => {
  let now = new Date();
  let t1 = new Date(now.getTime() - time);
  return db("ratelimiting")
    .count("*")
    .where("created_at", ">=", t1.toISOString())
    .andWhere("pathname", pathname);
};

/**
 * gets the role of the user
 * @param email the user's email
 * @returns the user's role, or false if email not found
 */
export const getUserRole = async (email: string) => {
  let res = await db("user").select("role").where("email", email.toLowerCase());
  if (!res.length) {
    return false;
  } else {
    return res[0].role;
  }
};

// ------------------------ Announcements ------------------------
export const getAnnouncements = async (count?: number) => {
  if (count) {
    return db("announcement")
      .join("user", "user.user_inc", "=", "announcement.from_user")
      .select(
        "announcement.ann_id",
        "announcement.message",
        "announcement.created_at",
        "announcement.link_url",
        "announcement.link_text",
        "announcement.view_count",
        "user.fname",
        "user.lname"
      )
      .orderBy("created_at", "desc")
      .limit(count);
  } else {
    return db("announcement")
      .join("user", "user.user_inc", "=", "announcement.from_user")
      .select(
        "announcement.ann_id",
        "announcement.message",
        "announcement.created_at",
        "announcement.link_url",
        "announcement.link_text",
        "announcement.view_count",
        "user.fname",
        "user.lname"
      )
      .orderBy("created_at", "desc");
  }
};

/**
 * Updates view count for announcement with announcement_id by 1
 * @param announcement_id the id of the announcement
 */
export const updateAnnouncementViews = async (announcementIds: number[]) => {
  await db("announcement")
    .whereIn("ann_id", announcementIds)
    .increment("view_count", 1);
};

/**
 * Updates announcement view. View count defaults to 0
 * @param message {string} message
 * @param user_id {number} the user's (who wrote the announcement) id
 */
export const insertAnnouncement = async (
  message: string,
  user_id: number,
  email_sent?: boolean,
  email_sent_to?: string,
  link_url?: string,
  link_text?: string
) => {
  await db
    .insert({
      message: message,
      from_user: user_id,
      email_sent,
      email_sent_to,
      link_url,
      link_text,
      // view count defaults to 0
    })
    .into("announcement");
};

/**
 * deletes an announcement
 * @param announcement_id the id of the announcement
 */
export const deleteAnnouncement = async (announcement_id: number) => {
  await db("announcement").where("ann_id", announcement_id).del();
};

// ---------------------- password reset ----------------------

export const getPasswordResets = async () => {
  return db("passwordreset").select(
    "reset_id",
    "user_email",
    "reset_code",
    "completed",
    "created_at"
  );
};

/**
 * checks whether a reset code exists
 * @param reset_code {string}
 * @returns true if unique, false otherwise
 */
export const checkResetCode = async (reset_code: string) => {
  let res = await db("passwordreset")
    .count("*")
    .where("reset_code", reset_code);
  if (res.length <= 0 || res[0].count <= 0) {
    return true;
  } else {
    return false;
  }
};

/**
 * attempts to intiate a password reset
 * @param user_email {string}
 * @returns reset_code or false if fails
 */
export const initiatePasswordReset = async (user_email: string) => {
  let reset_code;
  let unique = false;
  let count = 0;
  while (!unique && count < 15) {
    reset_code = crypto.randomBytes(24).toString("hex");
    let x = await checkResetCode(reset_code);
    if (x) {
      unique = true;
    } else {
      count++;
    }
  }
  if (count >= 15) {
    return false;
  } else {
    //insert
    await db("passwordreset").insert({
      user_email: user_email,
      reset_code: reset_code,
    });
    return reset_code;
  }
};

/**
 * attmepts a password reset
 * @param reset_code {string}
 * @param new_password {string}
 * @param next {NextFunction}
 */
export const attemptPasswordReset = async (
  reset_code: string,
  new_password: string,
  next: NextFunction
) => {
  let res1 = await db("passwordreset")
    .select("user_email", "created_at", "completed")
    .where("reset_code", reset_code);
  if (res1.length <= 0) {
    next(new StatusError("Invalid reset code.", 401));
    return;
  }
  let user_email = res1[0].user_email;
  let created_at = new Date(res1[0].created_at);
  let completed = res1[0].completed;
  //check if already completed
  if (completed) {
    next(new StatusError("Reset has already been completed.", 401));
    return;
  }
  //check if reset code is valid
  let now = new Date();
  let time_diff_ms = now.getTime() - created_at.getTime();
  let time_diff_s = time_diff_ms / 1000;
  let time_diff_m = time_diff_s / 60;
  if (time_diff_m > 10) {
    next(new StatusError("Password reset expired.", 401));
    return;
  }
  let new_hash = md5(new_password);
  await db("user").update({ password: new_hash }).where("email", user_email);
  await db("passwordreset")
    .update({ completed: true })
    .where("reset_code", reset_code);
};

/**
 * checks whether a user uuid exists
 * @param uuid {string}
 * @returns true if exists, false otherwise
 */
export const checkUUIDExists = async (uuid: string) => {
  let res = await db("user").count("*").where("uuid", uuid);
  if (res.length <= 0 || res[0].count <= 0) {
    return false;
  } else {
    return true;
  }
};

// ----------------------- billing details -----------------------

/**
 * gets all the billing details from the db
 * @param email {string}
 * @returns all billing details
 */
export const getBillingDetails = async (email?: string) => {
  if (!email) {
    return db("billing_details").select("*");
  } else {
    return db("billing_details").select("*").where("email", email);
  }
};

/**
 * checks whether billing details exist for given email
 * @param email user's email
 * @returns true if billing details exists under email given, false otherwise
 */
export const checkBillingDetailsExists = async (email: string) => {
  let res = await db("billing_details").count("*").where("email", email);
  if (!res || res[0].count <= 0) {
    return false;
  } else {
    return true;
  }
};

/**
 * inserts the given billing details into the db
 * @param billing_details the billing details returned from the stripe webhook
 */
export const createBillingDetails = async (billing_details: BillingDetails) => {
  if (billing_details.address) {
    await db("billing_details").insert({
      city: billing_details.address.city,
      country: billing_details.address.country,
      line1: billing_details.address.line1,
      line2: billing_details.address.line2,
      postal_code: billing_details.address.postal_code,
      state: billing_details.address.state,
      email: billing_details.email,
      name: billing_details.name,
      phone: billing_details.phone,
      payment_amount: billing_details.payment_amount
    });
  } else {
    await db("billing_details").insert({
      email: billing_details.email,
      name: billing_details.name,
      phone: billing_details.phone,
      payment_amount: billing_details.payment_amount
    });
  }
};

/**
 * inserts the given professor details into the db and sends them an email to register
 * @param prof_list list of professor billing details.
 * @param next NextFunction for middleware
 */
export const createProfBillingDetails = async (
  prof_list: Set<BillingDetails>,
  next: NextFunction
) => {
  let i;
  let it = prof_list.values();
  let curr;
  for (i = 0; i < prof_list.size; i++) {
    curr = it.next().value;
    createBillingDetails(curr);
  }
};
// -------------------------- forms --------------------------
/**
 * checks whether the projects form has been saved
 * @param email user's email
 * @returns true if exists, false otherwise
 */
export const checkFormProjectsExists = async (email: string) => {
  let res = await db("form_projects").count("*").where("user_email", email);
  if (!res || res[0].count <= 0) {
    return false;
  } else {
    return true;
  }
};
/**
 * checks whether the bootcamp form has been saved
 * @param email user's email
 * @returns true if exists, false otherwise
 */
export const checkFormBootcampExists = async (email: string) => {
  let res = await db("form_bootcamp").count("*").where("user_email", email);
  if (!res || res[0].count <= 0) {
    return false;
  } else {
    return true;
  }
};

// ----------------------- events -----------------------
/**
 * Gets a list of events
 * @param {number} count (optional) the number of events to return
 * @param {boolean} upcoming (optional) tells method to get future events
 * @param {boolean} ongoing (optional) tells method to get current events
 * @param {boolean} continuous (optional) tells method to get events that will always be active
 * @returns Events ordered by their descriptions.
 */
export const getEvents = async (
  count?: number | null,
  upcoming?: boolean | null,
  ongoing?: boolean | null,
  continuous?: boolean | null
) => {
  let order_by = "created_at";
  if (upcoming) {
    // console.log(1);

    order_by = "startISO";
    let now = new Date();
    // let t1 = new Date(now.getTime() - time);
    // return await db("ratelimiting")
    //   .count("*")
    //   .where("created_at", ">=", t1.toISOString())
    //   .andWhere("pathname", pathname);
    if (count) {
      return db("event")
        .select("*")
        .orderBy(order_by, "asc")
        .where("startISO", ">=", now.toISOString())
        .limit(count);
    } else {
      return db("event")
        .select("*")
        .orderBy(order_by, "asc")
        .where("startISO", ">=", now.toISOString());
    }
  } else if (ongoing) {
    // console.log(2);
    order_by = "endISO";
    let now = new Date();
    if (count) {
      return db("event")
        .select("*")
        .orderBy(order_by, "asc")
        .where("startISO", "<=", now.toISOString())
        .andWhere("endISO", ">=", now.toISOString())
        .limit(count);
    } else {
      return db("event")
        .select("*")
        .orderBy(order_by, "asc")
        .where("startISO", "<=", now.toISOString())
        .andWhere("endISO", ">=", now.toISOString());
    }
  } else if (continuous) {
    // console.log(3);

    if (count) {
      return db("event")
        .select("*")
        .orderBy(order_by, "desc")
        .where("startISO", null)
        .limit(count);
    } else {
      return db("event")
        .select("*")
        .orderBy(order_by, "desc")
        .where("startISO", null);
    }
  } else {
    // console.log(4);

    if (count) {
      return db("event").select("*").orderBy(order_by, "desc").limit(count);
    } else {
      return db("event").select("*").orderBy(order_by, "desc");
    }
  }
};
/**
 * Creates an event and stores it
 * @param {Event} e (mandatory) The Event object being created
 */
export const createEvent = async (e: Event) => {
  // table.increments("event_id").primary();
  // table.string("name");
  // table.string("location", 300);
  // table.string("imageData", 50000);
  // table.string("startDate");
  // table.string("startTime");
  // table.string("endDate");
  // table.string("endTime");
  // table.string("shortDescription", 500);
  // table.string("longDescription", 2000);
  // table.string("link", 500);
  // table.boolean("enabled").defaultTo("true");
  // table.timestamp("created_at").defaultTo(knex.fn.now());
  // table.timestamp("startISO");
  // table.timestamp("endISO");
  await db("event").insert({
    name: e.name,
    location: e.location,
    imageData: e.imageData,
    startDate: e.startDate,
    startTime: e.startTime,
    endDate: e.endDate,
    endTime: e.endTime,
    shortDescription: e.shortDescription,
    longDescription: e.longDescription,
    link: e.link,
    enabled: e.enabled ?? true,
    startISO: e.startISO,
    endISO: e.endISO,
  });
};

// ------------------------------- forms -------------------------------
export const createForm = async (f: Form) => {
  // table.string("name");
  // table.string("time");
  // table.string("url", 1000);
  // table.boolean("enabled").defaultTo(true);
  await db("forms").insert({
    name: f.name,
    time: f.time,
    url: f.url,
  });
};

/**
 * gets specified count of records by asc creation date
 * @param count the number of records to get
 * @returns database list of records sorted by creation date
 */
export const getForms = async (count?: number) => {
  return db("forms")
    .select("*")
    .orderBy("created_at", "asc")
    .limit(count || 500);
};

export const deleteform = async (formId: number) => {
  await db("forms").where("form_id", formId).del();
};

// ------------------------ Feedback ------------------------

export const createFeedback = async (f: Feedback) => {
  // table.string("name");
  // table.string("time");
  // table.string("url", 1000);
  // table.boolean("enabled").defaultTo(true);
  await db("feedback").insert({
    user_id: f.user_id,
    satisfaction: f.satisfaction,
    action: f.action,
    urgency: f.urgency,
    content: f.content,
  });
};

export const getFeedback = async (
  feedbackType: "bug" | "feature" | "change",
  count?: number
) => {
  return db("feedback")
    .select(
      "feedback_id",
      "action",
      "urgency",
      "content",
      "resolved",
      "resolved_by",
      "created_at"
    )
    .whereNotNull("content")
    .andWhere("action", feedbackType)
    .orderBy("created_at", "desc")
    .orderBy("resolved", "asc")
    .limit(count || 500);
};

// ---------------------------- checkin ----------------------------

/**
 * checks whether an event exists
 * @param event_id the identifier of the event to check
 * @returns boolean "true" if event exists; otherwise, "false"
 */
export const checkinEventExists = async (event_id: number) => {
  let res = await db("checkin_event").count("*").where({ event_id });
  if (res && res.length) {
    let count = parseInt(res[0].count);
    return count > 0;
  }
  return false;
};

// get list of checkin events
export const getCheckinEvents = async () => {
  return db("checkin_event").select("*");
};

/**
 * creates a new checkin event
 * @param name the name of the check-in event
 * @param created_by the id of the user making the event
 */
export const createCheckinEvent = async (name: string, created_by: number) => {
  await db("checkin_event").insert({ name, created_by });
};

/**
 * deletes a checkin event
 * @param event_id the id for the checkin event
 */
export const deleteCheckinEvent = async (event_id: number) => {
  await db("checkin_event").where({ event_id }).del();
};

/**
 * gets a list of people checked in to events
 * @param event_id the id of the event you want to get users checked in for
 * @returns list of users
 */
export const getCheckinUsers = async (event_id?: number) => {
  if (event_id) {
    return db("checkin_user").select("*").where({ event_id });
  } else {
    return db("checkin_user").select("*");
  }
};

/**
 * gets the user's id from their uuid
 * @param uuid the user's uuid
 * @returns user_id
 */
export const getUserFromUUID = async (uuid: string) => {
  let res = await db("user")
    .select("user_inc as user_id", "fname", "lname", "email")
    .where({ uuid });
  if (res && res.length) {
    return res[0];
  }
};

/**
 * attempts to check a user into an event
 * @param event_id the id for the event
 * @param user_id the user's id
 * @param created_by the id of the user making the event
 */
export const checkInUser = async (
  event_id: number,
  user_id: number,
  created_by: number
) => {
  await db("checkin_user").insert({ event_id, user_id, created_by });
};

/**
 * checks whether a user has been checked in
 * @param event_id the id for the event
 * @param user_id the user's id
 * @returns boolean true or false
 */
export const isUserCheckedIn = async (event_id: number, user_id: number) => {
  let res = await db("checkin_user").count("*").where({ event_id, user_id });
  if (res && res.length) {
    let count = parseInt(res[0].count);
    return count > 0;
  } else {
    return true;
  }
};

// ------------------------------ files ------------------------------
export const getAllMembers = async () => {
  return db("user").select(
    "user_inc",
    "email",
    "fname",
    "lname",
    "created_at",
    "enabled",
    "uuid",
    "major",
    "minor",
    "gtemail",
    "personalemail",
    "newmember",
    "studyyear",
    "gender",
    "ethnicity",
    "location",
    "experience",
    "interests",
    "role",
    "hear_about",
    "email_consent"
  );
};

/**
 * Gets all members that are enabled and who have accepted email announcements.
 */
export const getAllMembersWithEmailOn = async () => {
  let res = await db("user")
    .select("email")
    .where((builder: any) => {
      builder.where({ email_consent: true }).andWhere({ enabled: true });
    })
    .orWhere((builder: any) => {
      builder.whereNull("email_consent").andWhere({ enabled: true });
    });
  if (res && res.length) {
    return res.map((e: any) => e.email);
  } else {
    return [];
  }
};

/**
 * Gets all members that are enabled and who have accepted email announcements.
 */
export const getAllExecMembersWithEmailOn = async () => {
  let res = await db("user")
    .select("email")
    .where("role", "administrator")
    .orWhere("role", "developer");
  if (res && res.length) {
    return res.map((e: any) => e.email);
  } else {
    return [];
  }
};

// ------------------------------ teams ------------------------------

export const getTeams = async (count?: number) => {
  if (count && count > 0) {
    return (await db("teams").select("*").limit(count)) as Team[];
  } else {
    return (await db("teams").select("*")) as Team[];
  }
};

export const checkTeamIdExists = async (team_id: number) => {
  let res = await db("teams").count("*").where({ team_id });
  return res[0].count > 0;
};

/**
 * Gets a team from their ID number
 * @param team_id the team's ID number
 * @returns team with specified team_id
 */
export const getTeam = async (team_id: number) => {
  return (await db("teams").select("*").where({ team_id })) as Team[];
};

export const createTeam = async (name: string, description?: string) => {
  await db("teams").insert({ name, description });
};

export const updateTeam = async (
  team_id: number,
  name?: string,
  description?: string,
  members?: string
) => {
  await db("teams").update({ name, description, members }).where({ team_id });
};

/**
 * Gets a user from their ID number
 * @param user_id the user's ID number
 * @returns user with specified id
 */
export const getUserFromId = async (user_id: number) => {
  return (await db("user")
    .select("user_inc as user_id", "fname", "lname", "email", "gtemail")
    .where({ user_inc: user_id })) as TeamMember[];
};

/**
 * Gets a user's ID from their email or gtemail
 * @param email the user's email or gtemail
 * @returns user's ID or -1 if not found
 */
export const getUserIdFromEmail = async (email: string) => {
  let res = await db("user")
    .select("user_inc as user_id")
    .where({ email: email })
    .orWhere({ gtemail: email });
  if (res && res.length) {
    return parseInt(res[0].user_id);
  } else {
    return -1;
  }
};

/**
 * Counts the distinct number of majors, years or genders of students
 * @param list the list of majors, years, or genders, etc of students
 * @returns the distinct number of people
 */

const getDistinctCount = async (list: object[]) => {
  const map = new Map();
  list.forEach((element: any) => {
    let propName = Object.keys(element)[0] + "";
    //console.log(propName);
    let key = element[propName];
    //console.log(key);
    if (map.has(key)) {
      map.set(key, map.get(key) + 1);
    } else {
      map.set(key, 1);
    }
  });
  // console.log(map);
  return Object.fromEntries(map);
};

export const getUserDemographics = async () => {
  let emails = (await db("user").select("email")) as object[];
  let majors = (await db("user").select("major")) as object[];
  let genders = (await db("user").select("gender")) as object[];
  let years = (await db("user").select("studyyear")) as object[];
  let roles = (await db("user").select("role")) as object[];
  let interest = (await db("user").select("interests")) as object[];

  const userCount = emails.length;

  const majorObj = await getDistinctCount(majors);
  const yearObj = await getDistinctCount(years);
  const genderObj = await getDistinctCount(genders);
  const roleObj = await getDistinctCount(roles);
  const interestObj = new Map();
  interest.forEach((element: any) => {
    let propName = Object.keys(element)[0] + "";
    // console.log(propName);
    let key = JSON.parse(JSON.parse(element[propName]));
    // console.log(key);
    for (let ele of key) {
      if (interestObj.has(ele)) {
        interestObj.set(ele, interestObj.get(ele) + 1);
      } else {
        interestObj.set(ele, 1);
      }
    }
  });

  // console.log(majorObj);

  const retVal = {
    numberOfUsers: userCount,
    majorDist: majorObj,
    yearDist: yearObj,
    genderDist: genderObj,
    roleDist: roleObj,
    interestDist: Object.fromEntries(interestObj),
  };

  return retVal;
};

// ------------------------------ Project ------------------------------

/**
 * attempts to insert project application info into db
 * @param p project application object
 */
export const submitProjectInfo = async (p: ProjectInfo) => {
  let newFields = p.relatedFields;
  if (p.relatedFieldOther) {
    newFields = newFields.concat(", " + p.relatedFieldOther);
  }
  let newSkills = p.skillsDesired;
  if (p.skillDesiredOther) {
    newSkills = newSkills.concat(", " + p.skillDesiredOther);
  }

  await db.insert({
    project_name: p.name,
    project_location: p.location,
    project_hosts: p.hosts,
    contact_email: p.contactEmail,
    related_fields: newFields,
    project_description: p.description,
    num_students: p.numStudentsDesired,
    term_length: p.termLength,
    compensation_hour: p.compensationHour,
    start_date: p.startDate,
    desired_skills: newSkills,
    image_data: p.imgData
  }).into("projects");
}


/**
 * Gets a list of all the projects from the database "projects" table. 
 * @returns Returns a list of projects
 */
export const getProjects = async () => {
  return await db.select("*").from("projects").orderBy("project_inc", "desc");
};

/**
 * Gets a project from the database "projects" table.
 * @param project_id id of project to delete
 */
export const getProject = async (project_id: number) => {
  const project = await db("projects").select("*").where("project_inc", project_id);

  if (project.length === 0) {
    return null;
  } else {
    return project[0];
  }
}

/**
 * Removes a project from the database
 * @param project_id id of project to delete
 */
export const deleteProject = async (project_id: number) => {
  const result = await db("projects").where("project_inc", project_id).del();
  return result;
};

/**
 * Updates project info based on project_inc
 * @param project_id id of project to update
 * @param field_to_update field to update
 * @param updated_field updated field
 */
export const updateProject = async (project_id: number, field_to_update: string, updated_field: string | number) => {
  await db("projects").update({ [field_to_update]: updated_field }).where("project_inc", project_id);
};

// ------------------------------ Project Applications ------------------------------

/**
 * Adds a user application to the database.
 * @param {ProjectApp} u (mandatory) The user application object being created
 */
 export const createProjectApplication = async (u: ProjectApp) => {
  await db.insert({
    project_id: u.projectId,
    user_id: u.user_id,
    preferred_phone: u.preferredPhone,
    preferred_email: u.preferredEmail,
    linkedin: u.linkedin,
    resume: u.resume,
    technical_skills: u.technicalSkills,
    motivations: u.motivations,
    team_fit: u.teamFit,
    availability: u.availability,
  }).into("project_apps");
};

export const checkIfUserAppliedToProject = async(project_id: number, user_id: number) => {
  const count = await db("project_apps").
    where({
      project_id: project_id,
      user_id: user_id
    })
    .count("app_id as count")
    .first()
  return count.count > 0;
}

/**
 * Removes a project from the database
 * @param project_id id of project to delete
 */
export const deleteProjectApp = async (app_id: number) => {
  const result = await db("project_apps").where("app_id", app_id).del();
  return result;
};

/**
 * Gets a list of all the project apps from the database "project_apps" table. 
 * @returns Returns a list of projects
 */
export const getProjectApplications = async () => {
  return await db.select("*").from("project_apps").orderBy("app_id", "desc");
};