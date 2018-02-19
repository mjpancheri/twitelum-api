class UsuariosDAO {
    constructor(app) {
        this.dbUsuarios = app.infra.config.db.usuarios
    }

    buscaTodos() {
        return new Promise((resolve, reject) => {
            this.dbUsuarios.find({}, (err, data) => {
                if(err) {
                    reject(err)
                }
                resolve(data)
            })
        })
    }

    buscaUm(loginUsuario) {
        return new Promise((resolve, reject) => {
            const query = { login: loginUsuario }
            this.dbUsuarios.findOne(query, (err, data) => {
                if(err) {
                    reject(err)
                }
                resolve(data)
            })
        })
    }

    buscarPorLoginESenha(loginInfo) {
        return new Promise((resolve, reject) => {
            const query = { login: loginInfo.login, senha: loginInfo.senha }
            this.dbUsuarios.findOne(query, (err, data) => {
                if(err) {
                    reject(err)
                }
                resolve(data)
            })
        })
    }
    
    adicionar(usuario) {
        console.log(usuario)
        return new Promise((resolve, reject) => {
            this.dbUsuarios.insert(usuario, (err, data) => {
                if(err) {
                    reject(err)
                }
                resolve(data)
            })
        })
    }
}

module.exports = (app) => new UsuariosDAO(app)