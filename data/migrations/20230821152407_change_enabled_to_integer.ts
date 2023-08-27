import { Knex } from "knex";

export async function up(knex: Knex): Promise<any> {
    return knex.schema.alterTable('user', (table) => {
        table.integer('enabled').alter();
    });
}

export async function down(knex: Knex): Promise<any> {
    return knex.schema.alterTable('user', (table) => {
        table.boolean('enabled').alter();
    });
}

