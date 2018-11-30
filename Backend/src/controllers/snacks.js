const models = require("../models/snacks.js");

function getAll(req, res, next) {
  models.getAll()
  .then(data => {
    res.status(200).send(data);
  })
  .catch(next);
}

function getOne(req, res, next) {
  models.getOne(req.params.snackId)
  .then(data => {
    res.status(200).send(data);
  })
  .catch(next);
}

function getReviews(req, res, next) {
  models.getReviews(req.params.snackId)
  .then(data => {
    res.status(200).send(data);
  })
  .catch(next);
}

function create(req, res, next) {
  models.create(req.body)
  .then(data => {
    if (data.length < 1)
      throw { status: 400, message: "The item could not be created." };
    res.status(201).send(data);
  })
  .catch(next);
}

module.exports = { getAll, getOne, create, getReviews };
