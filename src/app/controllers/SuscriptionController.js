/* eslint-disable no-unused-vars */
const User = require('../models/user');
const Newsletter = require('../../utils/newsletter');
const TMDBService = require('../services/tmdb');
const excel = require('../../utils/excel');
const path = require('path');

/**
 * Represents a controller
 * @class
 * @author Isaac Canché
 */
class SuscriptionController {
  /**
   * @async
   * @param {req} req - HTTP Request
   * @param {res} res - HTTP Response
   * @returns res - HTTP Response
   */
  async sendNewsletter(req, res) {
    const users = await User.findAll();
    TMDBService()
      .then((response) => response.data.results)
      .then((movies) => {
        excel(
          movies,
          'movies',
          path.resolve('src', 'excelSheets', 'movies.xlsx')
        );
        users.forEach((user) => Newsletter.create(movies));
        users.forEach((user) => {
          Newsletter.sendEmail(user);
        });

        res.status(200).json({ message: 'Emails were sent' });
      })
      .catch((error) => console.log(error));
  }
}

module.exports = new SuscriptionController();
