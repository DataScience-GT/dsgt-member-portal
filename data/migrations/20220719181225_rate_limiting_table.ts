import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("ratelimiting", function (table) {
    table.increments("rate_id").primary();
    table.string("from_ip");
    table.string("pathname");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("ratelimiting");
}
