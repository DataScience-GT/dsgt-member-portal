import { Knex } from "knex";

/**
 * Use keyword "await" to make sure the statements are run sequentially
 * @param knex 
 * @returns knex migration
 */
export async function up(knex: Knex): Promise<void> {
    await knex.schema.renameTable('project_apps', 'projects');
    await knex.schema.dropTable('user_project_app');
    await knex.schema.table('projects', function (table) {
        table.string('image_data', 50000);
        table.timestamp("submitted_at").defaultTo(knex.fn.now());
    });
    return knex.schema
    .dropTableIfExists("project_apps")
    .createTable("project_apps", function (table) {
        table.increments("app_id").primary();
        table.integer("project_id").references("project_inc").inTable("projects").onDelete("CASCADE");
        table.string("uuid").references("uuid").inTable("user").onDelete("CASCADE");
        table.integer("preferred_phone", 255);
        table.string("preferred_email", 255);
        table.string("linkedin");
        table.string("resume");
        table.string("technical_skills", 1500);
        table.string("motivations", 1500);
        table.string("team_fit", 1500);
        table.string("availability", 1000);
        table.timestamp("submitted_at").defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("project_apps");
}

