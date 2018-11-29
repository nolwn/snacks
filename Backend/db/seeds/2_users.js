const users = require("../data/users.json");

exports.seed = function (knex, Promise) {
  return knex("users").del()
    .then(() => {
      return knex("users")
        .insert(users);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM snacks));"
      );
    })
}
