class TweetsController {
    constructor(app) {
        this.app = app
        this.TweetsDAO = this.app.infra.dao.TweetsDAO
        this.tweetsRepository = app.models.repositories.TweetsRepository
        
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
        // Pega o header 
        const body = req.body

        this.TweetsDAO
            .adicionar(this.tweetsRepository.toTweet(body))
            .then((data) => {
                // Status 201
                // Header location: /tweets/id
                res.status(201) 
                res.json(data)
            })
            .catch( (err) => res.json(err) )
    }


    deletar(req,res) {
        res.send({ nome: req.params.usuario })
    }
}

module.exports = (app) => new TweetsController(app)