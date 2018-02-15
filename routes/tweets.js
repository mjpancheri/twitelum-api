module.exports = (app) => {
    const tweetsController = app.controllers.TweetsController

    app.get('/tweets', tweetsController.listar)
    app.get('/tweets', tweetsController.listarUm)
    app.get('/tweets', tweetsController.adicionar)
    app.get('/tweets', tweetsController.deletar)

}