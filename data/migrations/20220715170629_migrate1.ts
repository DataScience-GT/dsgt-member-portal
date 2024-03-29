import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists("user")
    .createTable("user", function (table) {
      table.increments("user_inc").primary();
      table.string("email", 255).unique();
      table.string("fname", 255);
      table.string("lname", 255);
      table.string("password", 255);
      table.timestamp("created_at").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("user");
}
