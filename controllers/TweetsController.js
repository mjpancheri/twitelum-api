class TweetsController {
    constructor(app) {
        this.app = app
        this.TweetsDAO = this.app.infra.dao.TweetsDAO
        this.tweetsDTO = app.models.dtos.TweetsDTO
        
        // Class Methods
        this.listar = this.listar.bind(this)
        this.listarUm = this.listarUm.bind(this)
        this.adicionar = this.adicionar.bind(this)
        this.deletar = this.deletar.bind(this)
    }

    listar(req, res, next) {
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
        // Pega o header e verifica se tem um token
        const body = req.body

        this.TweetsDAO
            .adicionar(this.tweetsDTO.toTweet(body))
            .then((tweet) => {
                // Header location: /tweets/id
                req.header('location', `/tweets/${tweet._id}`);
                res.status(201) 
                res.json(tweet)
            })
            .catch( (err) => res.json(err) )
    }

    deletar(req,res) {
        res.send({ nome: req.params.usuario })
    }
}

module.exports = (app) => new TweetsController(app)