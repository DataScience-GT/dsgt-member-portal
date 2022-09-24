import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("teams", (table) => {
    table.increments("team_id").primary();
    table.string("name");
    table.string("description", 1000);
    table.string("members", 4000);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("teams");
}
