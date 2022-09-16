import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {

    // Delete all entries
    await knex("ratelimiting").del();
};
