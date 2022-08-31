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
    //add the user to the database
    let uuid = crypto.randomBytes(24).toString("hex");
    while (await checkUUIDExists(uuid)) {
      //regenerate new uuid until unique
      uuid = crypto.randomBytes(24).toString("hex");
    }
    let hash = md5(user.password);
    await db
      .insert({
        email: user.email,
        fname: user.fname,
        lname: user.lname,
        password: hash,
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
  //update each if defined
  if (fname) {
    await db("user").update({ fname: fname }).where("email", email);
  }
  if (lname) {
    await db("user").update({ lname: lname }).where("email", email);
  }
  if (password) {
    let hash = md5(password);
    await db("user").update({ password: hash }).where("email", email);
  }
  if (role) {
    await db("user").update({ role: role }).where("email", email);
  }
  if (enabled !== undefined) {
    await db("user").update({ enabled: enabled }).where("email", email);
  }
};

/**
 * checks whether an email has been used already.
 * @param email string
 * @returns `true` if email has already been used, `false` otherwise
 */
export const checkUserEmail = async (email: string) => {
  let res = await db("user")
    .count("*")
    .where("email", email)
    .orWhere("gtemail", email);
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
  //check if current password is correct
  let res = await db("user")
    .count("*")
    .where("email", email)
    .andWhere("password", curr_hash);
  if (res.length <= 0) {
    return false;
  } else {
    //update password
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
 * @returns enabled: boolean, or false if the email doesn't exist.
 */
export const getUserEnabled = async (email: string) => {
  let res = await db("user")
    .select("enabled")
    .where("email", email)
    .orWhere("gtemail", email);
  if (!res.length) {
    return false;
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
 * validates a user's session token
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
  return await db.select("*").from("ratelimiting");
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
  return await db("ratelimiting")
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
    return await db("announcement")
      .join("user", "user.user_inc", "=", "announcement.from_user")
      .select(
        "announcement.ann_id",
        "announcement.message",
        "announcement.created_at",
        "user.fname",
        "user.lname"
      )
      .orderBy("created_at", "desc")
      .limit(count);
  } else {
    return await db("announcement")
      .join("user", "user.user_inc", "=", "announcement.from_user")
      .select(
        "announcement.ann_id",
        "announcement.message",
        "announcement.created_at",
        "user.fname",
        "user.lname"
      )
      .orderBy("created_at", "desc");
  }
};

/**
 * creates a new announcement
 * @param message {string} message
 * @param user_id {number} the user's (who wrote the announcement) id
 */
export const insertAnnouncement = async (message: string, user_id: number) => {
  await db
    .insert({ message: message, from_user: user_id })
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
  return await db("passwordreset").select(
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
    return await db("billing_details").select("*");
  } else {
    return await db("billing_details").select("*").where("email", email);
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
  // table.string("city");
  // table.string("country");
  // table.string("line1");
  // table.string("line2");
  // table.string("postal_code");
  // table.string("state");
  // table.string("email");
  // table.string("name");
  // table.string("phone");
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
    });
  } else {
    await db("billing_details").insert({
      email: billing_details.email,
      name: billing_details.name,
      phone: billing_details.phone,
    });
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
      return await db("event")
        .select("*")
        .orderBy(order_by, "asc")
        .where("startISO", ">=", now.toISOString())
        .limit(count);
    } else {
      return await db("event")
        .select("*")
        .orderBy(order_by, "asc")
        .where("startISO", ">=", now.toISOString());
    }
  } else if (ongoing) {
    // console.log(2);
    order_by = "endISO";
    let now = new Date();
    if (count) {
      return await db("event")
        .select("*")
        .orderBy(order_by, "asc")
        .where("startISO", "<=", now.toISOString())
        .andWhere("endISO", ">=", now.toISOString())
        .limit(count);
    } else {
      return await db("event")
        .select("*")
        .orderBy(order_by, "asc")
        .where("startISO", "<=", now.toISOString())
        .andWhere("endISO", ">=", now.toISOString());
    }
  } else if (continuous) {
    // console.log(3);

    if (count) {
      return await db("event")
        .select("*")
        .orderBy(order_by, "desc")
        .where("startISO", null)
        .limit(count);
    } else {
      return await db("event")
        .select("*")
        .orderBy(order_by, "desc")
        .where("startISO", null);
    }
  } else {
    // console.log(4);

    if (count) {
      return await db("event")
        .select("*")
        .orderBy(order_by, "desc")
        .limit(count);
    } else {
      return await db("event").select("*").orderBy(order_by, "desc");
    }
  }
};

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

export const getForms = async (count?: number) => {
  return await db("forms")
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
  return await db("feedback")
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

// ------------------------------ files ------------------------------
export const getAllMembers = async () => {
  return await db("user").select(
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
