const bcrypt = require("bcrypt");

const knex = require("../../db/knex");
const utils = require("../utils");

function login(credentials) {
  let user;

  return knex("users")
    .where({ email: credentials.email })
    .then((data) => {
      if (data.length < 1) {
        throw { status: 400, message: "Bad Request" };
      }
      user = data[0];
      return bcrypt.compare(credentials.password, user.password);
    })
    .then(match => {
      if (!match) {
        throw ({ status: 400, message: "Bad Request" });
      }

      return {
        sub: {
          id: user.id,
          username: user.username
        },
        iat: Date.now()
      }
    });
}

module.exports = { login };
