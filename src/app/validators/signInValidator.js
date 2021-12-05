const Joi = require('joi');

/**
 * Represents a validator of data
 * @author
 */
class SignInValidator {
  /**
   * Represents a middleware
   * @param {*} req - HTTP Request
   * @param {*} res - HTTP Response
   * @param {*} next - callback
   * @returns res - HTTP Response
   */
  check(req, res, next) {
    const schema = Joi.object({
      email: Joi.string().trim().required(),
      password: Joi.string().trim().required(),
    });
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: 'There were errors', error });
    }
    next();
  }
}

module.exports = new SignInValidator();
