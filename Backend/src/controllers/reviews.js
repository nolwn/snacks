const models = require("../models/reviews");

function update(req, res, next) {
  models.update(req.params.reviewId);
    .then(data => {
      res.status(200).send(data);
    })
    .catch(next);
}

function create(req, res, next) {
  models.create(req.body)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(next);
}

module.exports = { getAll, create };
