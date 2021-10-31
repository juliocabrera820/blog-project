const sequelize = require('sequelize');
const config = require('../config/database');
const User = require('../app/models/user');

let connection = {};

if (process.env.NODE_ENV === 'development') {
  connection = new sequelize(config['development']);
} else {
  connection = new sequelize(config['test']);
}

User.init(connection);
module.exports = connection;
