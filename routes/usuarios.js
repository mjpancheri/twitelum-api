module.exports = (app) => {
    const usuariosController = app.controllers.UsuariosController

    app.get('/usuarios', usuariosController.listar)
    app.get('/usuarios/:login', usuariosController.listarUm)
    app.post('/usuarios/', usuariosController.adicionar)
    app.get('/usuarios/:login', usuariosController.deletar)
    app.get('/usuarios/:login/tweets', usuariosController.listarTweetsDeUmUsuario)

}