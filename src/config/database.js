require('dotenv').config();

module.exports = {
  development: {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: `${process.env.DB_NAME}_development`,
  },
  test: {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: `${process.env.DB_NAME}_test`,
  },
  production: {
    dialect: 'postgres',
    host: 'localhost',
    username: 'root',
    password: null,
    database: 'database',
  },
};
