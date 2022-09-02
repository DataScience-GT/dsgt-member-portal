import { Knex } from "knex";

let emails = [];

export async function seed(knex: Knex): Promise<void> {
  // change user roles to moderator
  // await knex("user").update({role: "administrator"}).where("email", "ssaraf33@gatech.edu");
  await knex("billing_details")
    .update({ email: "savunuri3@gatech.edu" })
    .where({ email: "madhavi.sreerangam@gmail.com" });
  await knex("user")
    .update({ email: "savunuri3@gatech.edu" })
    .where({ email: "madhavi.sreerangam@gmail.com" });
}
