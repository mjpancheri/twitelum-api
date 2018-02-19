// const authLogin = require('../middlewares/authLogin')

module.exports = (app) => {

    app.post('/login', (req, res) => {
            const jsonBody = JSON.parse(req.body)
            const login = jsonBody.login
            const senha = jsonBody.senha

            const token = authLogin.geraToken(login, senha)

            res.json({ token })
        }
    )

}