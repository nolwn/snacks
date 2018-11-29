const knex = require("../../db/knex");

function getAll(id) {
  return knex("users")
  .select("reviews.id", "title", "text", "rating", "users.first_name", "users.last_name")
  .join("reviews", "user_id", "users.id")
  .where({ "reviews.user_id": id })
}

module.exports = { getAll };
