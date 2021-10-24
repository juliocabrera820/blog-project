const sequelize = require('sequelize');
const config = require('../config/database.json');
const User = require('../app/models/user');

let connection = {};

if (process.env.DATABASE_URL) {
  connection = new sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: true,
  });
} else {
  connection = new sequelize(config);
}
User.init(connection);
module.exports = connection;
