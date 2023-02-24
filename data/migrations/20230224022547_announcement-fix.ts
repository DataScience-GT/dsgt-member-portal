import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("announcement", (table) => {
        // change length of email_sent_to to 5000
        table.string("email_sent_to", 1_000_000).alter();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("announcement", (table) => {
        table.string("email_sent_to", 1_000).alter();
    })
}

