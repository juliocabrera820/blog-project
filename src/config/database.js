require('dotenv').config();

module.exports = {
  development: {
    dialect: 'postgres',
    database: 'blog_development',
  },
  test: {
    dialect: 'postgres',
    database: 'blog_test',
  },
};
