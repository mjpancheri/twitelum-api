const restify = require('restify')
const consign = require('consign')

const app = restify.createServer()

require('dotenv').config()

// routes/tweets.js
app.get('/tweets', (req,res) => {
  res.send({ nome: 'Mario' })
})
app.get('/tweets/:usuario', (req,res) => {
  res.send({ nome: req.params.usuario })
})
app.post('/tweets/:usuario', (req,res) => {
  res.send({ nome: req.params.usuario })
})
app.delete('/tweets/:usuario', (req,res) => {
  res.send({ nome: req.params.usuario })
})

// routes/like.js
app.get('/likes', (req,res) => {
  res.send({ nome: 'Mario' })
})
app.get('/likes/:tweet', (req,res) => {
  res.send({ nome: req.params.tweet })
})
app.post('/likes/:tweet', (req,res) => {
  res.send({ nome: req.params.tweet })
})
app.delete('/likes/:tweet', (req,res) => {
  res.send({ nome: req.params.tweet })
})

// routes/usuarios.js
app.get('/usuarios', (req,res) => {
  res.send({ nome: 'Mario' })
})
app.get('/usuarios/:id', (req,res) => {
  res.send({ nome: req.params.id })
})
app.post('/usuarios/:id', (req,res) => {
  res.send({ nome: req.params.id })
})
app.update('/usuarios/:id', (req,res) => {
  res.send({ nome: req.params.id })
})
app.delete('/usuarios/:id', (req,res) => {
  res.send({ nome: req.params.id })
})

module.exports = app