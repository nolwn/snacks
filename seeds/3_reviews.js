
exports.seed = function(knex, Promise) {
  return knex('reviews').del()
    .then(function () {
      return knex('reviews').insert([
        {
          user_id: 1,
          snack_id: 1,
          text: 'What a delicious snack!',
          rating: 4.5
        },
        {
          user_id: 2,
          snack_id: 1,
          text: 'Yuck...',
          rating: 1.2
        },
        {
          user_id: 3,
          snack_id: 2,
          text: 'Pizza?',
          rating: 3
        }
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('reviews_id_seq', (SELECT MAX(id) FROM reviews));"
      );
    });
};
