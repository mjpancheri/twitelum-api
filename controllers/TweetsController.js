const errors = require('restify-errors');

class TweetsController {
    constructor(app) {
        this.app = app
        this.tweetsDAO = this.app.infra.dao.TweetsDAO
        this.tweetsDTO = app.models.dto.TweetsDTO
        
        // Class Methods
        this.listar = this.listar.bind(this)
        this.listarUm = this.listarUm.bind(this)
        this.adicionar = this.adicionar.bind(this)
        this.deletar = this.deletar.bind(this)
        this.like = this.like.bind(this)
    }

    listar(req, res) {
        this.tweetsDAO
            .buscaTodos()
            .then((data) => {
                res.json(data)
            })
    }

    listarUm(req,res) {
        const idTweet = req.params.id
        this.tweetsDAO
            .buscaUm(idTweet)
            .then((data) => {
                res.json(data)
            })
    }

    adicionar(req,res, next) {
        // Pega o header e verifica se tem o token pra poder publicar
        const body = req.body
        const jsonBody = typeof req.body === 'object' ? req.body : JSON.parse(body)
        
        try {
            this.tweetsDAO
                .adicionar(this.tweetsDTO.toTweet(jsonBody))
                .then((tweet) => {
                    // Header location: /tweets/id
                    req.header('location', `/tweets/${tweet._id}`);
                    res.status(201) 
                    res.json(tweet)
                })
                .catch( (err) => res.json(err) )
        } catch(e) {
            next( new errors.InvalidContentError(e.message) )
        }
    }

    deletar(req,res, next) {
        const tweetId = req.params.id
        this.tweetsDAO
            .remover(tweetId)
            .then((itensRemovidos) => {
                res.status(201) 
                res.json({
                    removidos: itensRemovidos,
                    message: `Tweet com id: ${tweetId} foi removido com sucesso`
                })
            })
            .catch((err) => {
                next(err)
            })
    }

    like(req,res, next) {
        const tweetInfo = {
            id: req.params.id,
            tweet: {
                usuario: {
                    login: req.login
                }
            }
        }

        this.tweetsDAO
            .toggleLike(tweetInfo)
            .then((response) => {
                res.status(201)
                res.json(response)
            })
            .catch((err) => {
                next(err)
            })
    }
}

module.exports = (app) => new TweetsController(app)