module.exports = (app) => {
    const tweetsController = app.controllers.TweetsController

    app.get('/tweets', tweetsController.listar)
    // app.get('/tweets/:id', tweetsController.listarUm)
    app.get('/tweets/:test', tweetsController.adicionar)
    // app.get('/tweets', tweetsController.deletar)

}