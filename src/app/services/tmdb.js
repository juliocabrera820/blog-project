const { default: axios } = require("axios")
require('dotenv').config()

const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_API_KEY = process.env.TMDB_API_KEY

module.exports = async () => {
  const { data } = await axios.get(`${TMDB_BASE_URL}/movie/latest?api_key=${TMDB_API_KEY}&language=en-US`)
  return [data]
}
