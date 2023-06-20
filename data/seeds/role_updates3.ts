import { Knex } from "knex";
import { checkUserEmail } from "../../model";

export async function seed(knex: Knex): Promise<void> {
    // Inserts seed entries
    if (process.env.NODE_ENV == "development") {
      await knex("billing_details").insert({ email: "membership@datasciencegt.org" });
    }
  }