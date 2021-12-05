require('dotenv').config();

/**
 * Represents configuration of database environments
 * @file
 * @author
 */
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
