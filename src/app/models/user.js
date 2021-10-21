const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        username: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: { msg: 'Username is missing' },
          },
        },
        email: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: { msg: 'Email is missing' },
          },
        },
        password: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: { msg: 'Password is missing' },
          },
        },
      },
      { sequelize, tableName: 'Users' }
    );
  }
}

module.exports = User;
