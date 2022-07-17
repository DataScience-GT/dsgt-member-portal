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
    .select("user_inc")
    .from("user")
    .where("email", email)
    .andWhere("password", hash);
  if (res.length <= 0) {
    return false;
  } else {
    return res[0].user_inc;
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

export const validateSession = async (session_id: string) => {
  let res = await db("session")
    .join("user", "user.user_inc", "=", "session.user_id")
    .select(
      "session.created_at",
      "session.user_id",
      "user.fname",
      "session.enabled"
    )
    .where("session_id", session_id);
  if (res.length <= 0) {
    return false;
  } else {
    return res[0];
  }
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
