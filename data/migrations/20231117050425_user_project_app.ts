import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .dropTableIfExists("user_project_app")
    .createTable("user_project_app", function (table) {
        table.increments("user_project_app_id").primary();
        table.string("user_id").unique();
        table.string("project_id").unique();
        table.string("saq_response_1", 1500);
        table.string("saq_response_2", 1500);
        table.string("user_goals");
        table.timestamp("submitted_at").defaultTo(knex.fn.now());
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("user_project_app");
}

