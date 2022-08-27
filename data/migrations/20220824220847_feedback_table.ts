import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("feedback", function (table) {
    table.increments("feedback_id").primary();
    table.integer("user_id").references("user_inc").inTable("user");
    table.string("satisfaction");
    table.string("action");
    table.integer("urgency");
    table.string("content", 1000);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("feedback");
}
