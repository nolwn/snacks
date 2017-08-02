
exports.up = function(knex, Promise) {
  return knex.schema.createTable('reviews', (table) => {
    table.increments();
    table.text('text').notNullable().defaultTo('');
    table.integer('user_id').notNullable().references('users.id').onDelete('CASCADE').index();
    table.integer('snack_id').notNullable().references('snacks.id').onDelete('CASCADE').index();
    table.float('rating').notNullable().defaultTo(0);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reviews')
};
