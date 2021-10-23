require('dotenv').config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  EXPIRATION_TIME: process.env.EXPIRATION_TIME,
};
