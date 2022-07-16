import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("session", function (table) {
    table.boolean("enabled").defaultTo(true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("session", function (table) {
    table.dropColumn("enabled");
  });
}
