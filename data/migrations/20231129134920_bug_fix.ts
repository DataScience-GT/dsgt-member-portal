import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.table('project_apps', function (table) {
        table.dropColumn('uuid');
    });
    return knex.schema.table("project_apps", function (table) {
        table.integer("user_id").references("user_inc").inTable("user");
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.table('project_apps', function (table) {
        table.dropColumn('user_id');
    });
    return knex.schema.table("project_apps", function (table) {
        table.string("uuid").references("uuid").inTable("user").onDelete("CASCADE");
    })
}
