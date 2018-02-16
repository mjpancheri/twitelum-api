const restify = require('restify')
const consign = require('consign')

const app = restify.createServer()

require('dotenv').config()

// Auto-load Everything 
consign()
  .include('infra')
  .then('models')
  .then('controllers')
  .then('routes')
  .into(app)

module.exports = app