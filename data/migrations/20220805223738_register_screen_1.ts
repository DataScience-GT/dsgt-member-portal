import { Knex } from "knex";

// fname
// lname
// password
// major
// minor
// gtemail
// personalEmail
// newMember
// studyYear
// gender
// ethnicity
// location
// experience
// interests

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("user", function (table) {
    table.string("major", 1000);
    table.string("minor", 1000);
    table.string("gtemail");
    table.string("personalemail");
    table.boolean("newmember").defaultTo(false);
    table.string("studyyear");
    table.string("gender");
    table.string("ethnicity");
    table.string("location");
    table.string("experience");
    table.string("interests", 1000);
    table.dropColumn("role");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("user", function (table) {
    table.dropColumn("major");
    table.dropColumn("minor");
    table.dropColumn("gtemail");
    table.dropColumn("personalemail");
    table.dropColumn("newmember");
    table.dropColumn("studyyear");
    table.dropColumn("gender");
    table.dropColumn("ethnicity");
    table.dropColumn("location");
    table.dropColumn("experience");
    table.dropColumn("interests");
    table.string("role").defaultTo("guest");
  });
}
