const Comment = require('../models/comment');

/**
 * Represents a controller
 * @class
 * @author Julio Cabrera
 */
class CommentsController {
  /**
   * @async
   * @param {req} req - HTTP Request
   * @param {res} res - HTTP Response
   * @returns res - HTTP Response
   */
  async index(req, res) {
    const {
      user: { id },
    } = req.user;

    const comments = await Comment.findAll({ where: { userId: id } });
    return res.status(200).json(comments);
  }
  /**
   * @async
   * @param {req} req - HTTP Request
   * @param {res} res - HTTP Response
   * @returns res - HTTP Response
   */
  async create(req, res) {
    const { movieId, content, title } = req.body;
    const {
      user: { id },
    } = req.user;

    const comment = await Comment.create({
      userId: id,
      movieId,
      content,
      title,
    });
    return res.status(201).json(comment);
  }
  /**
   * @async
   * @param {req} req - HTTP Request
   * @param {res} res - HTTP Response
   * @returns res - HTTP Response
   */
  async show(req, res) {
    const { commentId } = req.params;
    const {
      user: { id },
    } = req.user;
    const comment = await Comment.findOne({
      where: { userId: id, id: commentId },
    });
    if (!comment) {
      return res.status(404).json({ message: 'Comment does not exist' });
    }

    return res.status(200).json(comment);
  }
  /**
   * @async
   * @param {req} req - HTTP Request
   * @param {res} res - HTTP Response
   * @returns res - HTTP Response
   */
  async update(req, res) {
    const { id } = req.params;
    const { content } = req.body;
    const comment = await Comment.findByPk(id);
    console.log(comment);
    if (!comment) {
      return res.status(404).json({ message: 'Comment was not found' });
    }
    await Comment.update({ content }, { where: { id } });
    return res.json(200)
  }
  /**
   * @async
   * @param {req} req - HTTP Request
   * @param {res} res - HTTP Response
   * @returns res - HTTP Response
   */
  async destroy(req, res) {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.json(404).json({ message: 'comment does not exist' });
    }
    await Comment.destroy({ where: { id } });
    return res.json(200)
  }
  /**
   * @async
   * @param {req} req - HTTP Request
   * @param {res} res - HTTP Response
   * @returns res - HTTP Response
   */
  async movieComments(req, res) {
    const { movieId } = req.params;
    const movieComments = await Comment.findAll({
      where: { movieId },
      include: { association: 'user' },
    });

    return res.status(200).json(movieComments);
  }
}

module.exports = new CommentsController();
