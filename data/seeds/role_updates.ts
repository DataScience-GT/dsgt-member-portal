import { Knex } from "knex";
import { checkUserEmail } from "../../model";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  if (process.env.NODE_ENV == "development") {
    await knex("billing_details").insert({ email: "test@test.com" });
    if (await checkUserEmail("test@test.com")) {
      await knex("user")
        .update({ role: "member" })
        .where({ email: "test@test.com" });
    }
  }
}
