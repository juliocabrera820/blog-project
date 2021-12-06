const xlsx = require('xlsx');
const columns = require('./columnNames');

/**
 * @param {*} data - Movies
 * @param {*} columnNames - column names of an excel sheet
 * @param {*} sheetName - name of an excel sheet
 * @param {*} filepath - filepath where file will be created
 * @author
 */
const exportExcel = (data, columnNames, sheetName, filepath) => {
  const book = xlsx.utils.book_new();
  const sheetData = [columnNames, ...data];
  const sheet = xlsx.utils.aoa_to_sheet(sheetData);
  xlsx.utils.book_append_sheet(book, sheet, sheetName);
  xlsx.writeFile(book, filepath);
};

/**
 *
 * @param {*} data - movie
 * @param {*} sheetName - name of an excel sheet
 * @param {*} filepath - filepath where file will be created
 * @author
 */
const exportMovieCategoriesToExcel = async (data, sheetName, filepath) => {
  const movies = await data;
  const movieData = movies.map((movie) => [
    movie.original_language,
    movie.original_title,
    movie.popularity,
    movie.release_date,
    movie.title,
  ]);
  exportExcel(movieData, columns, sheetName, filepath);
};

module.exports = exportMovieCategoriesToExcel;
