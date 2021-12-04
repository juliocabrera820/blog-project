const Joi = require('joi');

class CommentValidator {
  check(req, res, next) {
    const schema = Joi.object({
      movieId: Joi.string().trim().required(),
      content: Joi.string().trim().min(5).max(200).required(),
    });
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: 'There were errors', error });
    }
    next();
  }
}

module.exports = new CommentValidator();
