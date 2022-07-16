import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("session", function (table) {
      table
        .integer("user_id")
        .references("user_id")
        .inTable("user")
        .onDelete("CASCADE");
      table.string("session_id", 255).unique();
      table.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .alterTable("user", function (table) {
      table.boolean("enabled").defaultTo(true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("session");
}
