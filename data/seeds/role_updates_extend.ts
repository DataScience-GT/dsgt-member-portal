import { Knex } from "knex";
import { checkUserEmail } from "../../model";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries for exec & test emails
  if (process.env.NODE_ENV == "development") {
    await knex("billing_details").insert({ email: "dsgttestprof@gmail.com"});
    if (await checkUserEmail("dsgttestprof@gmail.com")) {
        await knex("user")
          .update({ role: "professor" })
          .where({ email: "dsgttestprof@gmail.com" });
    }
    await knex("billing_details").insert({ email: "vmiranda6@gatech.edu"});
    // await knex("billing_details").insert({ email: "dsgttestemail@gmail.com"});
    // await knex("billing_details").insert({ email: "ssaraf33@gatech.edu"});
    // await knex("billing_details").insert({ email: "rgudla3@gatech.edu"});
    // await knex("billing_details").insert({ email: "pratham.mehta001@gmail.com"});
    // await knex("billing_details").insert({ email: "pbegwani3@gatech.edu"});
    // await knex("billing_details").insert({ email: "mgupta353@gatech.edu"});
    // await knex("billing_details").insert({ email: "kmanek3@gatech.edu"});
    // await knex("billing_details").insert({ email: "adevakonda3@gatech.edu"});
    // await knex("billing_details").insert({ email: "elawton3@gatech.edu"});
    // await knex("billing_details").insert({ email: "pennonshue@gmail.com"});
  }
}
