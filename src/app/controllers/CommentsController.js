const Comment = require('../models/comment');

class CommentsController {
  async index(req, res) {
    const { userId } = req.params;

    const comments = await Comment.findAll({ where: { userId } });
    return res.status(200).json(comments);
  }

  async create(req, res) {
    const { userId, movieId, content } = req.body;

    const comment = await Comment.create({ userId, movieId, content });
    return res.status(201).json(comment);
  }

  async show(req, res) {
    const { userId, commentId } = req.params;
    const comment = await Comment.findOne({ where: { userId, id: commentId } });
    if (!comment) {
      return res.status(404).json({ message: 'Comment does not exist' });
    }

    return res.status(200).json(comment);
  }

  async movieComments(req, res) {
    const { movieId } = req.params
    const movieComments = await Comment.findAll({ where: { movieId }, include: { association: 'user' } })

    return res.status(200).json(movieComments)
  }
}

module.exports = new CommentsController();
