const express = require('express');
const knex = require('../knex');

const router = express.Router();

router.get('/snacks', (req, res, next) => {
  knex('snacks')
    .then((result) => {
      res.send(result)
    })
    .catch((err) => next(err))
})

module.exports = router;
