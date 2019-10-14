require('dotenv').config()

const { API_PROVIDER } = process.env

console.log(process.env)

module.exports = {
  serverRuntimeConfig: {
    API_PROVIDER
  }
}
