const db = require("./data/db-config");
const md5 = require("md5");

import { log, warning, error } from "./Logger";
import { User, RegisterUser, LoginUser } from "./interfaces/User";
import { NewSession } from "./interfaces/Session";
import { NextFunction } from "express";

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

export const getUsers = () => {
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
};

/**
 * Registers a user. It is advised to use `checkUserEmail()` to make sure the email is unique.
 */
export const registerUser = async (
  { email, fname, lname, password }: Required<RegisterUser>,
  next: NextFunction
) => {
  try {
    //add the user to the database
    let hash = md5(password);
    await db
      .insert({ email: email, fname: fname, lname: lname, password: hash })
      .into("user");
    let res = await db
      .select("user_inc")
      .from("user")
      .where("email", email)
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
 * @param param0 User
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
  let res = await db("user").count("*").where("email", email);
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
  let res = await db
    .select("user_inc", "role")
    .from("user")
    .where("email", email)
    .andWhere("password", hash);
  if (res.length <= 0) {
    return false;
  } else {
    return res[0];
  }
};

/**
 * gets whether a user account in enabled or not.
 * @Note pair with checkUserEmail() to make sure the email exists first.
 * @param email user's email
 * @returns enabled: boolean, or false if the email doesn't exist.
 */
export const getUserEnabled = async (email: string) => {
  let res = await db("user").select("enabled").where("email", email);
  if (!res.length) {
    return false;
  } else {
    return res[0].enabled;
  }
};

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
 * @returns session.created_at, user_id, fname, session.enabled, role, email
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
      "user.email"
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

// export const loginUser = async ({ email, password }: Required<LoginUser>) => {
//   let hash = md5(password);
//   let res = await db("user")
//     .count("*")
//     .where("email", email)
//     .andWhere("password", hash);
//   if (parseInt(res[0].count)) {
//     return true;
//   }
//   return false;
// };

// /**
//  * gets all rows in game table
//  * @returns json
//  */
// const getGames = () => {
//     return db.select("*").from("game");
// };

// /**
//  * checks whether the game_code exists in the table
//  * @param {string} game_code the code for the game
//  * @returns the game_id if found
//  */
// const gameCodeExists = async (game_code) => {
//     let res = await db("game").select("game_id").where("game_code", game_code);
//     //let res = await db("game").count("*").where("game_code", game_code);
//     if (!res[0]) {
//         return null;
//     } else if (res[0].game_id) {
//         return res[0].game_id;
//     }
//     return null;
// };

// /**
//  * creates a new game
//  * @param {string} game_code code of the game
//  * @param {string} game_type type of game (trivia, etc)
//  * @returns db result
//  */
// const createGame = async (game_code, game_type) => {
//     await db
//         .insert({ game_code: game_code, game_type: game_type })
//         .into("game");

//     let res = await db
//         .select("game_id")
//         .from("game")
//         .where("game_code", game_code);
//     return res[0].game_id;
// };

// const getGameType = async (game_id) => {
//     let res = await db
//         .select("game_type")
//         .from("game")
//         .where("game_id", game_id);

//     if (res) {
//         if (res[0]) {
//             if (res[0].game_type) {
//                 return res[0].game_type;
//             }
//         }
//     }
//     return null;
// };

// const getGameCode = async (game_id) => {
//     let res = await db
//         .select("game_code")
//         .from("game")
//         .where("game_id", game_id);

//     if (res) {
//         if (res[0]) {
//             if (res[0].game_code) {
//                 return res[0].game_code;
//             }
//         }
//     }
//     return null;
// };

// const startGame = (game_id) => {
//     return db("game").update({ started: true }).where("game_id", game_id);
// };

// const getStarted = async (game_id) => {
//     let res = await db.select("started").from("game").where("game_id", game_id);

//     if (res) {
//         if (res[0]) {
//             if (res[0].started) {
//                 return res[0].started;
//             }
//         }
//     }
//     return false;
// };

// /**
//  * gets all rows in session table
//  * @returns json
//  */
// const getSessions = () => {
//     return db.select("*").from("session");
// };

// /**
//  * creates a new session (player joining a game)
//  * @param {string} game_id the id of the game the player is joining
//  * @param {string} username the username of the player
//  * @param {string} session_id the session token
//  * @returns vip? boolean
//  */
// const createSession = async (game_id, username, session_id) => {
//     let res = await db("session")
//         .count("*")
//         .where("game_id", game_id)
//         .andWhere("vip", true);

//     var vip = false;
//     if (parseInt(res[0].count) <= 0) {
//         //no vip yet
//         vip = true;
//     }

//     //vip already exists
//     await db
//         .insert({
//             game_id: game_id,
//             username: username,
//             session_id: session_id,
//             vip: vip,
//         })
//         .into("session");

//     return vip;
// };

// /**
//  * gets all players for a game
//  * @param {String} game_id the id of the game
//  * @returns json
//  */
// const getPlayers = (game_id:string) => {
//     //return db.select("*").from("session");
//     return db.select("*").from("session").where("game_id", game_id);
// };

// /**
//  * removes all rows from a table
//  * @param {String} table name of the table to wipe
//  * @returns db result
//  */
// const wipeTable = (table:string) => {
//     return db(table).del();
// };

// module.exports = {
//     getGames,
//     createGame,
//     gameCodeExists,
//     getGameType,
//     getGameCode,
//     startGame,
//     getStarted,

//     getSessions,
//     createSession,

//     getPlayers,

//     wipeTable,
// };
