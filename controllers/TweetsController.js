const errors = require('restify-errors');

class TweetsController {
    constructor(app) {
        this.app = app
        this.TweetsDAO = this.app.infra.dao.TweetsDAO
        this.tweetsDTO = app.models.dto.TweetsDTO
        
        // Class Methods
        this.listar = this.listar.bind(this)
        this.listarUm = this.listarUm.bind(this)
        this.adicionar = this.adicionar.bind(this)
        this.deletar = this.deletar.bind(this)
    }

    listar(req, res) {
        this.TweetsDAO
            .buscaTodos()
            .then((data) => {
                res.json(data)
            })
    }

    listarUm(req,res) {
        const idTweet = req.params.id
        this.TweetsDAO
            .buscaUm(idTweet)
            .then((data) => {
                res.json(data)
            })
    }

    adicionar(req,res, next) {
        // Pega o header e verifica se tem o token pra poder publicar
        const body = req.body
        let jsonBody;

        try {
            jsonBody = JSON.parse(req.body)

            this.TweetsDAO
                .adicionar(this.tweetsDTO.toTweet(jsonBody))
                .then((tweet) => {
                    // Header location: /tweets/id
                    req.header('location', `/tweets/${tweet._id}`);
                    res.status(201) 
                    res.json(tweet)
                })
                .catch( (err) => res.json(err) )
        } catch(e) {
            res.send( new errors.InvalidContentError(e.message) )
        }
    }

    deletar(req,res) {
        res.send({ status: `Não implementado: ${req.params.id}` })
    }
}

module.exports = (app) => new TweetsController(app)