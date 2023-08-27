import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('billing_details', (table) => {
        table.integer('payment_amount');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.table('billing_details', (table) => {
        table.dropColumn('payment_amount');
    });
}

