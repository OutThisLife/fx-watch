require('dotenv').config()

const { api_provider } = process.env

module.exports = {
  serverRuntimeConfig: {
    api_provider
  }
}
