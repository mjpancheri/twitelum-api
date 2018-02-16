class TweetsDTO {
    constructor(app) {
        this.app = app
        this.toTweet = this.toTweet.bind(this)
    }

    toTweet(body) {
        const jsonBody = JSON.parse(body)
        return {
            user: {
                login: jsonBody.login
            },
            conteudo: jsonBody.conteudo,
            dataCriacao: jsonBody.data || new Date(),
            likes: []
        }
    }
}

module.exports = (app) => new TweetsDTO(app)