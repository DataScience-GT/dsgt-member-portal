import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // update role
  await knex("user")
    .update({ role: "owner" })
    .where("email", "rambergerjohn@gmail.com");
}
