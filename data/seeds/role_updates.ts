import { Knex } from "knex";
import { checkUserEmail } from "../../model";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  if (process.env.NODE_ENV == "development") {
    // FACTORY RESET
    // await knex("billing_details").del();
    // await knex("user").del();
    // await knex("announcement").del();

    await knex("billing_details").insert({
      email: "vmiranda6@gatech.edu",
      payment_amount: 1500,
    });
    if (await checkUserEmail("vmiranda6@gatech.edu")) {
      await knex("user")
        .update({ role: "developer" })
        .where({ email: "vmiranda6@gatech.edu" });
    }

    await knex("billing_details").insert({
      email: "lvivekan3@gatech.edu",
      payment_amount: 1500,
    });
    if (await checkUserEmail("lvivekan3@gatech.edu")) {
      await knex("user")
        .update({ role: "developer" })
        .where({ email: "lvivekan3@gatech.edu" });
    }
  }
}
