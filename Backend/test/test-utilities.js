const knex = require("../db/knex");

const restartDatabase = done => {
  knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex.seed.run())
    .then(() => done());
}

const reseedDatabase = done => {
  return knex.seed.run();
}

const killDatabase = done => {
  knex.destroy()
    .then(() => done());
}

module.exports = { restartDatabase, killDatabase, reseedDatabase };
