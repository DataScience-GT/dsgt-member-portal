import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("forms", function (table) {
    table.increments("form_id").primary();
    table.string("name");
    table.string("time");
    table.string("url", 1000);
    table.boolean("enabled").defaultTo(true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("forms");
}
