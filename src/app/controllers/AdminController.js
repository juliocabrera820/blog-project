const User = require('../models/user');
const bcrypt = require('bcrypt');

/**
 * Represents a controller
 * @class
 * @author
 */
class AdminController {
  /**
   * @async
   * @param {req} req - HTTP Request
   * @param {res} res - HTTP Response
   * @returns res - HTTP Response
   */
  async create(req, res) {
    const { username, email, password } = req.body;
    const foundUser = await User.findOne({ where: { email } });

    if (foundUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const createdUser = await User.create({
      username,
      email,
      password: encryptedPassword,
      role: 'admin',
    });

    return res.status(201).json(createdUser);
  }
  /**
   * @async
   * @param {req} req - HTTP Request
   * @param {res} res - HTTP Response
   * @returns res - HTTP Response
   */
  async removeUser(req, res) {
    const { username } = req.params;
    const foundUser = await User.findOne({ where: { username } });

    if (!foundUser) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    await User.destroy({ where: { username } });
    return res.json(200)
  }

  async getUsers(req, res) {
    const users = await User.findAll({ where: { role: 'user' } })
    return res.status(200).json(users);
  }
}

module.exports = new AdminController();
