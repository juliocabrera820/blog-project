require('dotenv').config();

/**
 * Represents configuration of database environments
 * @file
 * @author Julio Cabrera
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
