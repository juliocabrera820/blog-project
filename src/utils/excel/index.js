const xlsx = require('xlsx')

const exportExcel = (data, columnNames, sheetName, filepath) => {
  const book = xlsx.utils.book_new()
  const sheetData = [columnNames, ...data]
  const sheet = xlsx.utils.aoa_to_sheet(sheetData)
  xlsx.utils.book_append_sheet(book, sheet, sheetName)
  xlsx.writeFile(book, filepath)
}

const exportMovieCategoriesToExcel = (movies, columnNames, sheetName, filepath) => {
  const data = movies.map(movie => ([movie.name, movie.year]))
  exportExcel(data, columnNames, sheetName, filepath)
}

module.exports = exportMovieCategoriesToExcel
