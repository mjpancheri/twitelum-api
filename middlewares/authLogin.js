const  jwt = require('jsonwebtoken')
const moment = require('moment')
const errors = require('restify-errors');

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

function authLoginMiddleware(req,res, next) {
    const token = req.query['X-AUTH-TOKEN'] || (req.headers.authorization || '').replace(/[bB]earer /, '')
    if(!token) {
        return next(new errors.UnauthorizedError('Token não enviado'))
    }

    const tokenDecodificado = decodificaToken(token)
    const isExpired = moment(tokenDecodificado.exp).isBefore(new Date())

    if(isExpired) {
        return next(new errors.UnauthorizedError('Token expirado'))
    } else {
        req.login = tokenDecodificado.login
        return next()
    }
}

module.exports = {
    geraToken,
    decodificaToken,
    middleware: authLoginMiddleware
}