import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("event", function (table) {
    table.increments("event_id").primary();
    table.string("name");
    // table.
  });
}

export async function down(knex: Knex): Promise<void> {}
