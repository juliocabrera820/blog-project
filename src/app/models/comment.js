const { Model, DataTypes } = require('sequelize');

class Comment extends Model {
  static init(sequelize) {
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

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }
}

module.exports = Comment;
