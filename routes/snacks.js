const express = require('express');
const knex = require('../knex');


const router = express.Router();

router.get('/snacks', (req, res) => {
  console.log('snacks bud?');
  knex('snacks')
    .then((result) => {
      console.log(result);
      res.send(result)
    })
    .catch((err) => next(err))
})



module.exports = router;
