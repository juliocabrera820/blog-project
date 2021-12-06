const path = require('path');
const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');
const { SENDGRID_API_KEY, PROVIDER } = require('../config/sendgrid');
const { createPDF } = require('./pdf')

/**
 * Represents a service to create a newsletter
 * @class
 * @author
 */
class Newsletter {
  /**
   *
   * @param {string} username - registered username
   */
  create(movies) {
    createPDF(movies)
  }
  /**
   * @async
   * @param {*} user - registered user
   */
  async sendEmail(user) {
    const transporter = nodemailer.createTransport(
      nodemailerSendgrid({ apiKey: SENDGRID_API_KEY })
    );

    await transporter.sendMail({
      from: PROVIDER,
      to: user.email,
      subject: `Hi ${user.username}`,
      html: `<h3>Dear ${user.username}, this is your weekly newsletter with the most popular movies</h3>`,
      attachments: [
        {
          filename: 'newsletter.pdf',
          path: path.resolve('src', 'pdfs', 'newsletter.pdf'),
        },
        {
          filename: 'excel_movie.xls',
          path: path.resolve('src', 'excelSheets', 'movies.xlsx'),
        },
      ],
    });
  }
}

module.exports = new Newsletter();
