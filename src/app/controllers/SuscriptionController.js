/* eslint-disable no-unused-vars */
const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');
const { SENDGRID_API_KEY, PROVIDER } = require('../../config/sendgrid');

const PDFPrinter = require('pdfmake');
const fs = require('fs');
const fonts = require('../../utils/pdf/fonts');
const styles = require('../../utils/pdf/styles');
const { content } = require('../../utils/pdf/content');
const path = require('path');

class SuscriptionController {
  async sendEmail(req, res) {
    let attachment = {
      content,
      styles,
    };

    const printer = new PDFPrinter(fonts);

    let PDFDocument = printer.createPdfKitDocument(attachment);
    PDFDocument.pipe(
      fs.createWriteStream(path.resolve('src', 'pdfs', 'newsletter.pdf'))
    );
    PDFDocument.end();

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
        attachments: [
          {
            filename: 'newsletter.pdf',
            path: path.resolve('src', 'pdfs', 'newsletter.pdf'),
          },
        ],
      });
      return res.status(200).json({ message: 'Email was successfully sent' });
    } catch (error) {
      return res.status(400).json({ message: 'There was an error' });
    }
  }
}

module.exports = new SuscriptionController();
