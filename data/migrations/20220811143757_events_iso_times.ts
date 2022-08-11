import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("event", function (table) {
    table.timestamp("startISO");
    table.timestamp("endISO");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("event", function (table) {
    table.dropColumn("startISO");
    table.dropColumn("endISO");
  });
}
