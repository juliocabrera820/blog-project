/* eslint-disable no-unused-vars */
const User = require('../models/user');
const Newsletter = require('../../utils/newsletter');

class SuscriptionController {
  async sendNewsletter(req, res) {
    const users = await User.findAll({
      include: { association: 'MovieCategories' },
    });
    users.forEach((user) => Newsletter.create(user.username));
    users.forEach((user) => {
      Newsletter.sendEmail(user);
    });

    res.status(200).json({ message: 'Emails were sent' });
  }
}

module.exports = new SuscriptionController();
