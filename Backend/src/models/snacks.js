const knex = require("../../db/knex");
const utils = require("../utils.js");

function getReviews(snackId) {
  return knex("reviews")
    .select("reviews.*", "users.first_name", "users.last_name", "users.email")
    .where({ snack_id: snackId })
    .innerJoin("users", "users.id", "reviews.user_id");
}

function getAll() {
  return knex("snacks")
    .then((result) => {
      return result
    })
}

function getSnack(id) {
  return knex("snacks")
    .where({ id: id })
    .then(([ result ]) => {
      if (!result) {
        throw { status: 404, message: "Snack could not be found." };
      }

      return result;
    })
}

function getOne(id) {
  return Promise.all([
    getSnack(id),
    getAverageRating(id),
    getReviews(id)
  ])
  .then(results => {
    const [ snack, rating, reviews ] = results;
    snack.reviews = reviews;
    snack.rating = rating.avg;
    return snack;
  });
}

function getAverageRating(snackId) {
  return knex("snacks")
    .innerJoin("reviews", "reviews.snack_id", "snacks.id")
    .where({ "snacks.id": snackId })
    .avg("reviews.rating")
    .then(([ data ]) => {
      data.avg = parseInt(data.avg);
      return data;
    })
}

function create(entry) {
  const errors = utils.verifyEntry(entry, "snacks");

  if (errors.length > 0)
    throw { status: 400, message: "Entry also requires " +  errors.join(", ") };

  return knex("snacks")
    .insert(entry)
    .returning("*");
}

module.exports = {
  getAll,
  getOne,
  create,
  getReviews,
  getAverageRating
};
