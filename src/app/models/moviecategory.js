'use strict';
const { Model, DataTypes } = require('sequelize');

class MovieCategory extends Model {
  static init(sequelize) {
    super.init(
      {
        userId: {
          type: DataTypes.INTEGER,
          validate: {
            notEmpty: { msg: 'userId is missing' },
          },
        },
        name: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: { msg: 'name is missing' },
          },
        },
      },
      { sequelize, tableName: 'MovieCategories' }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }
}

module.exports = MovieCategory;
