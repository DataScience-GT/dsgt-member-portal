import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Inserts seed entries
    await knex("user").update({role: "administrator"}).where("email", "ssaraf33@gatech.edu")
};
