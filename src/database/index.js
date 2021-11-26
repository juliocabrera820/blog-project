const sequelize = require('sequelize');
const config = require('../config/database');
const User = require('../app/models/user');
const Comment = require('../app/models/comment');
const MovieCategory = require('../app/models/moviecategory');

let connection = {};

if (process.env.NODE_ENV === 'development') {
  connection = new sequelize(config['development']);
} else {
  connection = new sequelize(config['test']);
}

User.init(connection);
Comment.init(connection);
MovieCategory.init(connection);

User.associate(connection.models);
Comment.associate(connection.models);
MovieCategory.associate(connection.models);

module.exports = connection;
