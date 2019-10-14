require('dotenv').config()

const { API_PROVIDER } = process.env

module.exports = {
  env: {
    API_PROVIDER
  }
}
