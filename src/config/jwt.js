require('dotenv').config();

/**
 * Represents configuration of json web token
 * @file
 * @author
 */
module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  EXPIRATION_TIME: process.env.EXPIRATION_TIME,
};
