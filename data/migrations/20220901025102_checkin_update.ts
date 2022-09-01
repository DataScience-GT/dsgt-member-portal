import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("checkin_user", function (table) {
    table.dropColumn("event_id");
    table.dropColumn("user_id");
    table.dropColumn("created_by");
  });
}

export async function down(knex: Knex): Promise<void> {}
