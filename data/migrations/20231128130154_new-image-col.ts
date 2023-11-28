import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.table('projects', function (table) {
        table.string('image_data', 1000000);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.table('projects', function (table) {
        table.dropColumn('image_data');
    });
}

