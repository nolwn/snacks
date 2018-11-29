const reviews = require("../data/reviews.json");

exports.seed = function (knex, Promise) {
  return knex("reviews").del()
    .then(() => {
      return knex("reviews")
        .insert(reviews);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('reviews_id_seq', (SELECT MAX(id) FROM reviews));"
      );
    })
}
