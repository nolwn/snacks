const models = require("../models/reviews");


function getAll(req, res, next) {
  models.getAll(req.params.userId)
  .then(data => {
    res.status(200).send(data);
  })
  .catch(next);
}

module.exports = { getAll };
