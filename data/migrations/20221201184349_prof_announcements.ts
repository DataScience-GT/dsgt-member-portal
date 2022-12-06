import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("announcement", (table) => {
    // whether an email was sent
    table.boolean("email_sent").defaultTo(false);
    // list of emails sent to
    table.string("email_sent_to", 1000);

    // link url
    table.string("link_url");
    // link text
    table.string("link_text");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("announcement", (table) => {
    table.dropColumn("email_sent");
    table.dropColumn("email_sent_to");
    table.dropColumn("link_url");
    table.dropColumn("link_text");
  });
}
