import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('project_apps', function (table) {
        table.string('status', 255).defaultTo("pending");
        table.timestamp("status_change_timestamp").defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.table('project_apps', function (table) {
        table.dropColumn('status');
        table.dropColumn("status_change_timestamp");
    });
}

