exports.up = function(knex, Promise) {
  return knex.schema.createTable("reviews", table => {
    table.increments();
    table.string("title");
    table.text("text");
    table.integer("rating");
    table.integer("snack_id");
    table.integer("user_id");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("reviews");
};
