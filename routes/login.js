// const authLogin = require('../middlewares/authLogin')

module.exports = (app) => {
    const authLogin = app.middlewares.authLogin
    app.post('/login', (req, res) => {
            const jsonBody = typeof req.body === 'object' ? req.body : JSON.parse(req.body)
            const login = jsonBody.login
            const senha = jsonBody.senha
            
            const token = authLogin.geraToken(login, senha)

            res.json({ token })
        }
    )

}