import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("user")
    .update({ role: "developer" })
    .where("email", "rambergerjohn@gmail.com");
}
