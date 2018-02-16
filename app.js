const restify = require('restify')
const consign = require('consign')

const app = restify.createServer()

app.use(restify.plugins.bodyParser({ mapParams: false }));

require('dotenv').config()

// Auto-load Everything 
consign()
  .include('infra')
  .then('models')
  .then('controllers')
  .then('routes')
  .into(app)

module.exports = app