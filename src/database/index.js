const sequelize = require('sequelize');
const config = require('../config/database');
const User = require('../app/models/user');

let connection = {}

if (process.env.NODE_ENV === 'production') {
    connection = new sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        port: 5432,
        host: '<heroku host>'
    })
} else {
    connection = new sequelize(config);
}

User.init(connection);
module.exports = connection;