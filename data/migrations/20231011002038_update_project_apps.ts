import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('project_apps', function (table) {
        table.string('project_hosts', 255);
        table.string("contact_email", 255);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.table('project_apps', function (table) {
        table.dropColumn('project_hosts');
        table.dropColumn("contact_email");
    });
}

