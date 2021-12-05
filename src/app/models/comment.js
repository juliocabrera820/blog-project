const { Model, DataTypes } = require('sequelize');

/**
 * Represents a sequelize model
 * @author
 */
class Comment extends Model {
  static init(sequelize) {
    /**
     * @param {any} sequelize - Sequelize
     */
    super.init(
      {
        userId: {
          type: DataTypes.INTEGER,
          validate: {
            notEmpty: { msg: 'userId is missing' },
          },
        },
        movieId: {
          type: DataTypes.INTEGER,
          validate: {
            notEmpty: { msg: 'movieId is missing' },
          },
        },
        content: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: { msg: 'content is missing' },
            len: [5, 200],
          },
        },
        title: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: { msg: 'title is missing' },
          },
        },
      },
      { sequelize, tableName: 'Comments' }
    );
  }
  /**
   * @param {Sequelize} models - Sequelize models
   */
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }
}

module.exports = Comment;
