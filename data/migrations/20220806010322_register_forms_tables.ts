import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("form_projects", function (table) {
      table
        .string("user_email")
        .references("email")
        .inTable("user")
        .onDelete("CASCADE");
      table.boolean("interested").defaultTo("false");
      table.boolean("partOfProject");
      table.boolean("interestedInParticipating");
      table.string("projectsInterestedIn", 1000);
      table.string("hours");
      table.boolean("meetingConsent");
    })
    .createTable("form_bootcamp", function (table) {
      table
        .string("user_email")
        .references("email")
        .inTable("user")
        .onDelete("CASCADE");
      table.boolean("interested").defaultTo("false");
      table.string("typeInterestedIn", 1000);
      table.boolean("meetingConsent");
      table.boolean("dataConsent");
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists("form_projects")
    .dropTableIfExists("form_bootcamp");
}
