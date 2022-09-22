import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  if (process.env.NODE_ENV == "development") {
    await knex("billing_details").insert({ email: "test@test.com" });
    await knex("user")
      .update({ role: "developer" })
      .where({ email: "test@test.com" });
  }
}
