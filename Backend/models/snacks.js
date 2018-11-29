const knex = require("../db/knex");
const utils = require("../utils.js");

function getAll() {
  return knex('snacks')
  .then((result) => {
    return result
  })
}

function getOne(id) {
  return knex("snacks")
  .where({ id: id })
  .then(result => {
    if (result.length === 0) {
      throw { status: 404, message: "Snack could not be found." };
    }

    return result;
  })
  .then(result => result);
}

function create(entry) {
  const errors = utils.verifyEntry(entry, "snacks");

  if (errors.length > 0)
    throw { status: 400, message: "Entry also requires " +  errors.join(", ") };

  return knex("snacks")
    .insert(entry)
    .returning("*");
}

module.exports = { getAll, getOne, create };
