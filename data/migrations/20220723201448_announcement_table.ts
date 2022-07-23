import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("announcement", function (table) {
    table.increments("ann_id").primary();
    table.string("message").notNullable();
    table
      .integer("from_user")
      .references("user_inc")
      .inTable("user")
      .onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {}
