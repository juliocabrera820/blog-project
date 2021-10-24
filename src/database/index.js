const sequelize = require('sequelize');
const config = require('../config/database.json');
const User = require('../app/models/user');

const connection = new sequelize(config);
User.init(connection);
module.exports = connection;
