// const authLogin = require('../middlewares/authLogin')

module.exports = (app) => {
    const tweetsController = app.controllers.TweetsController
    const authLogin = app.middlewares.authLogin

    app.get('/tweets', tweetsController.listar)
    app.get('/tweets/:id', tweetsController.listarUm)
    app.post('/tweets/', authLogin.middleware, tweetsController.adicionar)
    app.del('/tweets/:id', authLogin.middleware, tweetsController.deletar)
    app.post('/tweets/:id/like', authLogin.middleware, tweetsController.like)
}