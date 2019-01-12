exports.seed = function(knex, Promise) {
  return knex("reviews").del()
    .then(() => {
      return knex("snacks").del();
    })
    .then(() => {
      return knex("users").del();
    })
}
