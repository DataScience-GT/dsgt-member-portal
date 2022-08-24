import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("feedback", function (table) {
    table.boolean("resolved").defaultTo(false);
    table.integer("resolved_by").references("user_inc").inTable("user");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("feedback", function (table) {
    table.dropColumns("resolved", "resolved_by");
  });
}
