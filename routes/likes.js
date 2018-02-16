module.exports = (app) => {
    app.get('/likes', (req,res) => {
    res.send({ nome: 'likes' })
    })
    app.get('/likes/:tweet', (req,res) => {
    res.send({ nome: req.params.tweet })
    })
    app.post('/likes/:tweet', (req,res) => {
    res.send({ nome: req.params.tweet })
    })
    app.del('/likes/:tweet', (req,res) => {
    res.send({ nome: req.params.tweet })
    })
}