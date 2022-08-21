import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  //change devarshes email
  await knex("user")
    .update({ email: "devarshspandya@gmail.com" })
    .where("email", "=", "Devarshspandya@gmail.com");
}
