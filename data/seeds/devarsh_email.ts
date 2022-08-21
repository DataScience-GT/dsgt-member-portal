import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  //change devarshes email
  await knex("user")
    .update({ email: "Devarshspandya@gmail.com" })
    .where("email", "=", "snehalpandya@hotmail.com");
}
