import { Knex } from "knex";

// name
// location
// imageData
// startDate
// startTime
// endDate
// endTime
// shortDescription
// longDescription
// link
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("event", function (table) {
    table.increments("event_id").primary();
    table.string("name");
    table.string("location", 300);
    table.string("imageData", 50000);
    table.string("startDate");
    table.string("startTime");
    table.string("endDate");
    table.string("endTime");
    table.string("shortDescription", 500);
    table.string("longDescription", 2000);
    table.string("link", 500);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {}
