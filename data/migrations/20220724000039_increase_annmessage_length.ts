import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("announcement", function (table) {
    table.string("message", 5000);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("announcement", function (table) {
    table.dropColumn("message");
  });
}
