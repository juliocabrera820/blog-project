const pdf = require('pdf-creator-node')
const fs = require('fs')
const path = require('path')

const html = fs.readFileSync(path.resolve('src', 'utils', 'pdf', 'index.html'), 'utf-8')
const createPDF = (movies) => {
  const document = {
    html,
    data: {
      movies: movies.slice(0, 6),
    },
    path: path.resolve('src', 'pdfs', 'newsletter.pdf')
  }
  const options = {}
  pdf.create(document, options)
}

module.exports = { createPDF }
