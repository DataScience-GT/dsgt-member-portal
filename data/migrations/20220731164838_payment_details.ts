import { Knex } from "knex";

// export interface BillingDetails {
//     address: {
//       city: string;
//       country: string;
//       line1: string;
//       line2?: string;
//       postal_code: number | string;
//       state: string;
//     };
//     email: string;
//     name: string;
//     phone?: string;
//   }

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("billing_details", function (table) {
    table.increments("details_id").primary();
    table.string("city");
    table.string("country");
    table.string("line1");
    table.string("line2");
    table.string("postal_code");
    table.string("state");
    table.string("email");
    table.string("name");
    table.string("phone");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("billing_details");
}
