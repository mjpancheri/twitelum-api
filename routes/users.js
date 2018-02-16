module.exports = (app) =>  {
    app.get('/users', (req,res) => {
    res.send({ nome: 'users' })
    })
    app.get('/users/:id', (req,res) => {
    res.send({ nome: req.params.id })
    })
    app.post('/users/:id', (req,res) => {
    res.send({ nome: req.params.id })
    })
    app.put('/users/:id', (req,res) => {
    res.send({ nome: req.params.id })
    })
    app.del('/users/:id', (req,res) => {
    res.send({ nome: req.params.id })
    })
}