/* eslint-disable no-undef */
require('dotenv').config();

module.exports = {
  development: {
    database: 'blog_development',
    dialect: 'postgres',
  },
  test: {
    database: 'blog_test',
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        required: true,
        rejectUnauthorized: false,
      },
    },
  },
};
