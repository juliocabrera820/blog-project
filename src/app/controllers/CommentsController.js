const Comment = require('../models/comment');

class CommentsController {
  async index(req, res) {
    const { user: { id } } = req.user;

    const comments = await Comment.findAll({ where: { userId: id } });
    return res.status(200).json(comments);
  }

  async create(req, res) {
    const { movieId, content } = req.body;
    const { user: { id } } = req.user;

    const comment = await Comment.create({ userId: id, movieId, content });
    return res.status(201).json(comment);
  }

  async show(req, res) {
    const { commentId } = req.params;
    const { user: { id } } = req.user;
    const comment = await Comment.findOne({ where: { userId: id, id: commentId } });
    if (!comment) {
      return res.status(404).json({ message: 'Comment does not exist' });
    }

    return res.status(200).json(comment);
  }

  async update(req, res) {
    const { id } = req.params
    const { content } = req.body
    const comment = await Comment.findByPk(id)
    console.log(comment)
    if (!comment) {
      return res.status(404).json({ message: 'Comment was not found' })
    }
    await Comment.update({ content }, { where: { id } })
    return res.json(200).json({ message: 'comment was successfully updated' })
  }

  async destroy(req, res) {
    const { id } = req.params
    const comment = await Comment.findByPk(id)
    if (!comment) {
      return res.json(404).json({ message: 'comment does not exist' })
    }
    await Comment.destroy({ where: { id } })
    return res.json(200).json({ message: 'comment was deleted' })
  }

  async movieComments(req, res) {
    const { movieId } = req.params
    const movieComments = await Comment.findAll({ where: { movieId }, include: { association: 'user' } })

    return res.status(200).json(movieComments)
  }
}

module.exports = new CommentsController();
