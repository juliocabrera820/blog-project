const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET, EXPIRATION_TIME } = require('../../config/jwt');

class AuthenticationController {
  async signUp(req, res) {
    try {
      const { username, email, password } = req.body;
      const foundUser = await User.findOne({ where: { email } });

      if (foundUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const user = await User.create({ username, email, password });

      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ message: 'server error', error });
    }
  }

  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'Email does not exist' });
      }
      if (password === user.password) {
        const token = jwt.sign({ user }, JWT_SECRET, {
          expiresIn: EXPIRATION_TIME,
        });
        return res.status(200).json(token);
      }
      return res.status(400).json({ message: 'Email or password incorrect' });
    } catch (error) {
      return res.status(500).json({ message: 'server error', error });
    }
  }
}

module.exports = new AuthenticationController();
