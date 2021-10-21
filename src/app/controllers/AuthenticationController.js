const User = require('../models/user');

class AuthenticationController {
  async signUp(req, res) {
    const { username, email, password } = req.body;
    const foundUser = await User.findOne({ where: { email } });

    if (foundUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ username, email, password });

    return res.status(201).json(user);
  }
}

module.exports = new AuthenticationController();
