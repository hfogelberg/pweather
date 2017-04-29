const IS_LOCAL = process.env.NODE_ENV !== 'production';
const DARK_WEATHER_KEY = process.env.DARK_WEATHER_KEY || 'dd7aee29471de7467a81eb91c6be98d9';
const API_ROOT_URL = IS_LOCAL
    ? 'http://localhost:8081/api'
    : 'http://pweather.golizzard.com/api'

module.exports = {
  IS_LOCAL,
  API_ROOT_URL
}
