const db = require("./data/db-config");
//const md5 = require("md5");

const getUsers = () => {
  return db.select("*").from("user");
};

export { getUsers };

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
