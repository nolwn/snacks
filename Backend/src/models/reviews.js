const knex = require("../../db/knex");

function create(entry) {
  return knex("reviews")
    .insert(entry)
    .returning("*")
    .then(([ data ]) => data);
}

function update(id, entry) {
  return knex("reviews")
    .update({
       title: entry.title,
        text: entry.text,
      rating: entry.rating,
     user_id: entry.user_id,
    snack_id: entry.snack_id
    }, "*")
    .where({ id: id })
}

module.exports = { getAll };
