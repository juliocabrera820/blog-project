const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET, EXPIRATION_TIME } = require('../../config/jwt');
const bcrypt = require('bcrypt');

class AuthenticationController {
  async signUp(req, res) {
    const { username, email, password } = req.body;
    const foundUser = await User.findOne({ where: { email } });

    if (foundUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: encryptedPassword,
    });

    return res.status(201).json(user);
  }

  async signIn(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Email does not exist' });
    }
    const result = await bcrypt.compare(password, user.password);

    if (result) {
      const token = jwt.sign({ user }, JWT_SECRET, {
        expiresIn: EXPIRATION_TIME,
      });
      return res.status(200).json(token);
    }
    return res.status(400).json({ message: 'Email or password incorrect' });
  }
}

module.exports = new AuthenticationController();
