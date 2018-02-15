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
            .buscaTodos()
            .then((data) => {
                res.json(data)
            })
    }
    // # Fluxo louco-insano
    // Service vai pegar os dados
    // O DTO pega os dados que o service retorna e converte pro nosso dominio
    // O controller pega esse dado convertido e manda pra view

    listarUm(req,res) {
        res.send({ nome: req.params.usuario })
    }

    adicionar(req,res) {
        res.send({ nome: req.params.usuario })
    }

    deletar(req,res) {
        res.send({ nome: req.params.usuario })
    }
}

module.exports = (app) => new TweetsController(app)