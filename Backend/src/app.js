const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

if (process.env.NODE_ENV !== "production") {
  require("dotenv").load();
}

const app = express();
const snacks = require('./routes/snacks');
const users = require("./routes/users");
const reviews = require("./routes/reviews");
const authorization = require("./routes/auth");

app.use(bodyParser.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/snacks", snacks);
app.use("/api/users", users);
app.use("/auth", authorization);
// app.use("/api/users/reviews", reviews);

app.use((req, res) => {
  const status = 404;
  const message = `Could not ${req.method} ${req.path}`;
  res.status(status).json({ status, message });
});

app.use((err, _req, res, _next) => {
  // console.error(err);
  const status = err.status || 500;
  const message = err.message || 'Something went wrong!';
  const stack = err.stack;
  res.status(status).json({ status, message, stack });
});

const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log('listening on port', port);
  });
}

module.exports = app;
