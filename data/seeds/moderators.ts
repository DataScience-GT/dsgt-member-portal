import { Knex } from "knex";

let emails = [];

export async function seed(knex: Knex): Promise<void> {
  // change user roles to moderator
  // await knex("user").update({role: "administrator"}).where("email", "ssaraf33@gatech.edu");
}
