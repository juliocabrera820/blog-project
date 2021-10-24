const sequelize = require('sequelize');
const config = require('../config/database');
const User = require('../app/models/user');

const connection = new sequelize(config);

User.init(connection);
module.exports = connection;