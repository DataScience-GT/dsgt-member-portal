import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("passwordreset", function (table) {
    table.increments("reset_id").primary();
    table
      .string("user_email")
      .references("email")
      .inTable("user")
      .onDelete("CASCADE");
    table.string("reset_code").unique();
    table.boolean("completed").defaultTo(false);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("passwordreset");
}
