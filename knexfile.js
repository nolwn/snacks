'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/snacks_dev'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/snacks_test'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
