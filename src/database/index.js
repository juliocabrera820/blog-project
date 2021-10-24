const sequelize = require('sequelize');
const config = require('../config/database');
const User = require('../app/models/user');

let connection = {};

if (process.env.DATABASE_URL) {
  connection = new sequelize(config['production']);
} else {
  connection = new sequelize(config['development']);
}

User.init(connection);
module.exports = connection;
