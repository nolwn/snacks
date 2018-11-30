const jwt = require("jsonwebtoken");

const models = require("../models/auth");

const secret = process.env.SECRET;

function login(req, res, next) {
  models.login(req.body)
  .then(payload => {
    const token = jwt.sign(payload, secret);

    res.status(200).send({ token });
  })
  .catch(next);
}

module.exports = { login };
