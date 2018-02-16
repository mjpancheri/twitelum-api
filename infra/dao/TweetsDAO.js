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
}

module.exports = (app) => new TweetsDAO(app)