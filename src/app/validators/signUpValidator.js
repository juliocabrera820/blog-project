const Joi = require('joi');

class SignUpValidator {
  check(req, res, next) {
    const schema = Joi.object({
      username: Joi.string().trim().required(),
      email: Joi.string().trim().required(),
      password: Joi.string().trim().required(),
      categories: Joi.array().items(),
    });
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: 'There were errors', error });
    }
    next();
  }
}

module.exports = new SignUpValidator();
