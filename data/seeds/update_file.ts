import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("billing_details").delete().where("email", "aeng48@gatech.edu");
};
