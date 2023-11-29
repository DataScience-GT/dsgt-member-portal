import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.table('project_apps', function (table) {
        table.dropColumn('preferred_phone');
    });
    return knex.schema.table("project_apps", function (table) {
        table.string("preferred_phone", 255);
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.table('project_apps', function (table) {
        table.dropColumn('preferred_phone');
    });
    return knex.schema.table("project_apps", function (table) {
        table.integer("preferred_phone");
    })
}

