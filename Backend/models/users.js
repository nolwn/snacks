const knex = require("../db/knex");
const utils = require("../utils");
const bcrypt = require("bcrypt");

function getAll() {
  return knex("users")
    .select("id", "first_name", "last_name", "email")
    .then(data => data);
}

function getOne(id) {
  return knex("users")
    .select("id", "first_name", "last_name", "email")
    .where({ id: id })
    .then(data => data);
}

function create(entry) {
  const errors = utils.verifyEntry(entry, "users");

  if (errors.length > 0) {
    throw { status: 400, message: `Entry also requires ${errors.join(", ")}` };
  }

  return bcrypt.hash(entry.password, 10)
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

module.exports = { getAll, getOne, create };
