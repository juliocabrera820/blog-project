/* eslint-disable no-unused-vars */
const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');
const { SENDGRID_API_KEY, PROVIDER } = require('../../config/sendgrid');

class SuscriptionController {
  async sendEmail(req, res) {
    const transporter = nodemailer.createTransport(
      nodemailerSendgrid({ apiKey: SENDGRID_API_KEY })
    );
    const { email } = req.body;
    try {
      await transporter.sendMail({
        from: PROVIDER,
        to: email,
        subject: 'hello world',
        html: '<h1>Hello world!</h1>',
      });
      return res.status(200).json({ message: 'Email was successfully sent' });
    } catch (error) {
      return res.status(400).json({ message: 'There was an error' });
    }
  }
}

module.exports = new SuscriptionController();
