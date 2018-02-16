class TweetsDTO {
    constructor(app) {
        this.app = app
        this.toTweet = this.toTweet.bind(this)
    }

    toTweet(jsonBody) {
        return {
            usuario: {
                login: jsonBody.login
            },
            conteudo: jsonBody.conteudo,
            dataCriacao: jsonBody.data || new Date(),
            likes: []
        }
    }
}

module.exports = (app) => new TweetsDTO(app)