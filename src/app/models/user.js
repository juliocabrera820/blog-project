const { Model, DataTypes } = require('sequelize');

/**
 * Represents a sequelize model
 * @author Isaac Canché
 */
class User extends Model {
  /**
   * @param {any} sequelize - Sequelize
   */
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
        role: {
          type: DataTypes.STRING,
        },
      },
      { sequelize, tableName: 'Users' }
    );
  }
  /**
   * @param {Sequelize} models - Sequelize models
   */
  static associate(models) {
    this.hasMany(models.Comment, {
      foreignKey: 'userId',
      as: 'comments',
      onDelete: 'CASCADE',
      hooks: true,
    });
  }
}

module.exports = User;
