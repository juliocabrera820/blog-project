require('dotenv').config();

/**
 * Represents configuration of sendgrid service
 * @file
 * @author Julio Cabrera
 */
module.exports = {
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  PROVIDER: process.env.PROVIDER,
};
