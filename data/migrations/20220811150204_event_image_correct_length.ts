import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("event", function (table) {
    table.string("imageData", 10000000);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("event", function (table) {
    table.dropColumn("imageData");
  });
}
