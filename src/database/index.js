const sequelize = require('sequelize');
const config = require('../config/database');
const User = require('../app/models/user');
let connection = {};

if (process.env.JAWSDB_URL) {
  connection = new sequelize(process.env.JAWSDB_URL);
} else {
  connection = new sequelize(config);
}

User.init(connection);
module.exports = connection;
