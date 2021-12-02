const xlsx = require('xlsx')
const columns = require('./columnNames')

const exportExcel = (data, columnNames, sheetName, filepath) => {
  const book = xlsx.utils.book_new()
  const sheetData = [columnNames, ...data]
  const sheet = xlsx.utils.aoa_to_sheet(sheetData)
  xlsx.utils.book_append_sheet(book, sheet, sheetName)
  xlsx.writeFile(book, filepath)
}

const exportMovieCategoriesToExcel = async (data, sheetName, filepath) => {
  const movies = await data
  const movieData = movies.map(movie => ([movie.original_language, movie.original_title, movie.popularity, movie.status, movie.title]))
  exportExcel(movieData, columns, sheetName, filepath)
}

module.exports = exportMovieCategoriesToExcel
