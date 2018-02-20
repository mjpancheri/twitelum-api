const jwt = require('jsonwebtoken')
const moment = require('moment')
const errors = require('restify-errors')

function geraToken(login, senha, olderToken) {
    const loginToken = {
        login,
        senha
    }
    const token = jwt.sign(
        loginToken,
        process.env.JWTSECRET,
        { expiresIn: moment().add(14, 'days').valueOf() }
    );
    return token
}

function decodificaToken(token) {
    var tokenDecodificado = jwt.verify(token, process.env.JWTSECRET);
    return tokenDecodificado
}

module.exports = function(app) {
    const usuariosDAO = app.infra.dao.UsuariosDAO
    return {
        geraToken,
        decodificaToken,
        middleware: function authLoginMiddleware(req,res, next) {
            
            if(!req.query['X-AUTH-TOKEN'] && req.body) { ///Buraco para conseguir cadastrar tweets enviando um login
                req.login = req.body.login
                return next()
            }

            const token = req.query['X-AUTH-TOKEN'] || (req.headers.authorization || '').replace(/[bB]earer /, '')
            if(!token) {
                return next(new errors.UnauthorizedError('Token não enviado'))
            }
            try {
                const tokenDecodificado = decodificaToken(token)
                const isExpired = moment(tokenDecodificado.exp).isBefore(new Date())
                if(isExpired) {
                    return next(new errors.UnauthorizedError('Token expirado'))
                }
                
                return usuariosDAO.buscarPorLoginESenha(tokenDecodificado)
                                    .then((usuario) => {
                                        if(!usuario)
                                            throw new NotFoundError('Usuário não encontrado')
                                        req.login = tokenDecodificado.login
                                        return next()
                                    })
            } catch(err) {
                return next(new errors.UnauthorizedError('Token inválido'))
            }
        }
    }
}