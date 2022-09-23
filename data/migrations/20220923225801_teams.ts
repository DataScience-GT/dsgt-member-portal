import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("teams", (table) => {
    table.increments("team_id");
    
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("teams");
}
