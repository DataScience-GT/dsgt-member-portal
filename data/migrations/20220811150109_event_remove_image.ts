import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("event", function (table) {
    table.dropColumn("imageData");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("event", function (table) {
    table.string("imageData", 50000);
  });
}
