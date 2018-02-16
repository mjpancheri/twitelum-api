module.exports = (app) => {
    app.post('/login', (req,res) => {
        res.send({ nome: req.params.id })
    })
}