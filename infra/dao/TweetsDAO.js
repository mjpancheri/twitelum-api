class TweetsDAO {
    constructor(app) {
        this.dbTweets = app.infra.config.db.tweets

        this.buscaTodos = this.buscaTodos.bind(this)
    }

    buscaTodos() {
        return new Promise((resolve, reject) => {
            this.dbTweets.find({}, (err, data) => {
                if(err) {
                    reject(err)
                }
                resolve(data)
            })
        })
    }

    buscaUm(idTweet) {
        return new Promise((resolve, reject) => {
            const query = { _id: idTweet }
            this.dbTweets.findOne(query, (err, data) => {
                if(err) {
                    reject(err)
                }
                resolve(data)
            })
        })
    }

    buscaTodosDeUmUsuario(loginUsuario) {
        return new Promise((resolve, reject) => {
            const query = { "usuario.login": loginUsuario }
            
            this.dbTweets.find(query, (err, data) => {
                if(err) {
                    reject(err)
                }
                resolve(data)
            })
        })
    }
    
    adicionar(tweet) {
        console.log(tweet)
        return new Promise((resolve, reject) => {
            this.dbTweets.insert(tweet, (err, data) => {
                if(err) {
                    reject(err)
                }
                resolve(data)
            })
        })
    }
}

module.exports = (app) => new TweetsDAO(app)