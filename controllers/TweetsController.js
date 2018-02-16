class TweetsController {
    constructor(app) {
        this.app = app
        this.tweetsService = app.models.services.TweetsService
        
        // Class Methods
        this.listar = this.listar.bind(this)
        this.listarUm = this.listarUm.bind(this)
        this.adicionar = this.adicionar.bind(this)
        this.deletar = this.deletar.bind(this)
    }

    listar(req, res, next) {
        this.tweetsService
            .pegaTodos()
            .then((data) => {
                res.json(data)
            })
    }
    // # Fluxo louco-insano
    // Service vai pegar os dados
    // O DTO (Repository) pega os dados que o service retorna e converte pro nosso dominio
    // O controller pega esse dado convertido e manda pra view

    listarUm(req,res) {
        const idTweet = req.params.id
        this.tweetsService
            .pegaUm(idTweet)
            // Aqui poderia ter o DTO (Repository) pra alterar o Objeto
            .then((data) => {
                res.json(data)
            })
    }

    adicionar(req,res) {
        const dbTweets = this.app.infra.config.db.tweets

        dbTweets.insert({ conteudo: 'Alo alo w brazil', criadoEm: new Date() ,userID: 1 }, function (err, newDoc) {
            res.send(newDoc)
        }); 
    }

    deletar(req,res) {
        res.send({ nome: req.params.usuario })
    }
}

module.exports = (app) => new TweetsController(app)