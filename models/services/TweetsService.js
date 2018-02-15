class TweetsService {
    constructor(app) {
        this.app = app
        this.UsuariosDAO = this.app.infra.dao.UsuariosDAO
    }

    buscaTodos() {
        return this.UsuariosDAO
                   .buscaTodos()
    }
}