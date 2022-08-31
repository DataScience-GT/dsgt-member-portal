import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("checkin_event", function (table) {
      table.increments("event_id");
      table.string("name");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.integer("created_by").references("user_inc").inTable("user");
    })
    .createTable("checkin_user", function (table) {
      table.increments("checkin_id");
      table.integer("event_id").references("event_id").inTable("checkin_event");
      table.integer("user_id").references("user_inc").inTable("user");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.integer("created_by").references("user_inc").inTable("user");
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("checkin_event").dropTable("checkin_user");
}
