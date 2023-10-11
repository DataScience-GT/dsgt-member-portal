import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists("project_apps")
        .createTable("project_apps", function (table) {
            table.increments("project_inc").primary();
            table.string("project_name", 255).unique();
            table.string("contact_email", 255);
            table.string("related_fields", 1000);
            table.string("project_description", 1000);
            table.integer("num_students").defaultTo(0);
            table.string("term_length", 255);
            table.integer("compensation_hour").defaultTo(0);
            table.string("start_date", 255);
            table.string("desired_skills", 1000);
        }
    );
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("project_apps");
}

