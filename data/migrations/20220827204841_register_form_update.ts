import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("user", function (table) {
    table.string("hear_about", 500);
    table.boolean("email_consent");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("user", function (table) {
    table.dropColumn("hear_about");
    table.dropColumn("email_consent");
  });
}
