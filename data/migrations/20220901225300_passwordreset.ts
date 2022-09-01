import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("passwordreset", function (table) {
    table.string("user_email").alter();
  });
}

export async function down(knex: Knex): Promise<void> {}
