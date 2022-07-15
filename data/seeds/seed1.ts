import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("user").del();

  // Inserts seed entries
  await knex("user").insert({
    email: "test@email.com",
    fname: "John",
    lname: "Ram",
    password: "password123",
  });
}
