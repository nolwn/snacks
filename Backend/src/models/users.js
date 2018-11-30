const bcrypt = require("bcrypt");

const knex = require("../../db/knex");
const utils = require("../utils");

function getAll() {
  return knex("users")
    .select("id", "first_name", "last_name", "email")
}

function getOne(id) {
  return knex("users")
    .select("id", "first_name", "last_name", "email")
    .where({ id: id });
}

function getAllReviews(id) {
  return knex("users")
    .innerJoin("reviews", "reviews.user_id", "users.id")
    .select("reviews.id", "title", "text", "rating")
    .where({ "user_id": id });
}

function create(entry) {
  const errors = utils.verifyEntry(entry, "users");

  if (errors.length > 0) {
    throw { status: 400, message: `Entry also requires ${errors.join(", ")}` };
  }

  return knex("users")
    .where({ email: entry.email })
    .then(data => {
      if(data.length > 0) {
        throw { status: 400, message: "A user with that email already exists." };
      }

      return bcrypt.hash(entry.password, 10)
    })
    .then((hash, err) => {
      if (err) {
        throw { status: 400, message: "Could not hash the password" };
      }

      entry.password = hash;
      return knex("users")
        .insert(entry)
        .returning("*")
    })
    .then(response => {
      delete response[0].password;

      return response;
    })
}

module.exports = { getAll, getOne, getAllReviews, create };
