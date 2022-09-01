import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("checkin_user", function (table) {
    table
      .integer("event_id")
      .references("event_id")
      .inTable("checkin_event")
      .onDelete("CASCADE");
    table
      .integer("user_id")
      .references("user_inc")
      .inTable("user")
      .onDelete("CASCADE");
    table
      .integer("created_by")
      .references("user_inc")
      .inTable("user")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {}
