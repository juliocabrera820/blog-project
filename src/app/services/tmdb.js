const { default: axios } = require('axios');
require('dotenv').config();

/**
 * @constant
 */
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
/**
 * @constant
 */
const TMDB_API_KEY = process.env.TMDB_API_KEY;

/**
 * Represents a service
 * @returns - Promise
 * @author
 */
module.exports = async () => {
  return axios.get(
    `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`
  );
};
