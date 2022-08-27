// table.increments("feedback_id").primary();
// table.integer("user_id").references("user_inc").inTable("user");
// table.string("satisfaction");
// table.string("action");
// table.integer("urgency");
// table.string("content", 1000);
// table.timestamp("created_at").defaultTo(knex.fn.now());

export type Feedback = {
  user_id?: number;
  satisfaction?: string | number;
  action?: string;
  urgency?: number;
  content?: string;
};
