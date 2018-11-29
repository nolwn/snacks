const jwt = require("jsonwebtoken");

const models = require("../models/users");

const secret = process.env.SECRET;

function getAll(req, res, next) {
  models.getAll()
  .then(data => {
    if (data.length === 0) {
      throw { status: 404, message: "Could not find any entries." };
    }

    res.status(200).send(data);
  })
  .catch(next);
}

function getAllReviews(req, res, next) {
  models.getAll(req.params.userId)
  .then(data => {
    res.status(200).send(data);
  })
  .catch(next);
}

function getOne(req, res, next) {
  models.getOne(req.params.id)
  .then(data => {
    if (data.length === 0) {
      throw { status: 404, message: `Could not find a user with the id ${id}` };
    }

    res.status(200).send(data);
  })
  .catch(next);
}

function create(req, res, next) {
  models.create(req.body)
  .then(data => {
    if (data.length < 0) {
      throw { status: 400, message: "The entry could not be added." };
    }

    res.status(201).send(data);
  })
  .catch(next);
}

function login(req, res, next) {
  models.login(req.body)
  .then(payload => {
    const token = jwt.sign(payload, secret);

    res.status(200).send({ token });
  })
  .catch(next);
}

module.exports = { getAll, getAllReviews, getOne, create, login };
