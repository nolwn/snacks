
const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const app = express()
app.use(bodyParser.json());
app.use(express.static(path.join('public')));

const snacks = require('./routes/snacks')
const users = require('./routes/users')
app.use(snacks)
app.use(users)

app.use((req, res) => {
  res.sendStatus(404);
});

app.use((err, _req, res, _next) => {
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }

  console.error(err.stack);
  res.sendStatus(500);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('listening on port', port)
})
