import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('announcement', function (table) {
        table.integer('view_count').defaultTo(0);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.table('announcement', function (table) {
        table.dropColumn('view_count');
    });
}

