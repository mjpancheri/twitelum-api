class TweetsRepository {
    constructor(app) {
        this.app = app
        this.toTweet = this.toTweet.bind(this)
    }

    toTweet(body) {
        return {
            user: {
                login: body.login
            },
            conteudo: body.conteudo,
            dataCriacao: new Date(),
            likes: []
        }
    }
}

module.exports = (app) => new TweetsRepository(app)