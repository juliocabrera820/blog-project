const PDFPrinter = require('pdfmake');
const path = require('path');
const fonts = require('../utils/pdf/fonts');
const styles = require('../utils/pdf/styles');
const { content } = require('../utils/pdf/content');
const fs = require('fs');
const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');
const { SENDGRID_API_KEY, PROVIDER } = require('../config/sendgrid');

class Newsletter {
  create(username) {
    let attachment = {
      content,
      styles,
    };
    const printer = new PDFPrinter(fonts);

    let PDFDocument = printer.createPdfKitDocument(attachment);
    PDFDocument.pipe(
      fs.createWriteStream(
        path.resolve('src', 'pdfs', `newsletter_${username}.pdf`)
      )
    );
    PDFDocument.end();
  }

  async sendEmail(user) {
    const transporter = nodemailer.createTransport(
      nodemailerSendgrid({ apiKey: SENDGRID_API_KEY })
    );

    await transporter.sendMail({
      from: PROVIDER,
      to: user.email,
      subject: `Hi ${user.username}`,
      html: '<h1>Hello, this is your newsletter</h1>',
      attachments: [
        {
          filename: `newsletter_${user.username}.pdf`,
          path: path.resolve('src', 'pdfs', `newsletter_${user.username}.pdf`),
        },
        {
          filename: 'excel_movie.xls',
          path: path.resolve('src', 'excelSheets', 'movies.xlsx')
        }
      ],
    });
  }
}

module.exports = new Newsletter();
