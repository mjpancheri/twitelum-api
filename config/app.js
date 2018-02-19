const restify = require('restify')
const consign = require('consign')
const errors = require('restify-errors')

const app = restify.createServer()

app.use(restify.plugins.bodyParser({ mapParams: false }));
app.use(restify.plugins.queryParser());

require('dotenv').config()

// Auto-load Everything 
consign()
  .include('infra')
  .then('models')
  .then('controllers')
  .then('middlewares')
  .then('routes')
  .into(app)
  

module.exports = app