class TweetsDAO {
    constructor(app) {
        this.dbTweets = app.infra.config.db.Tweets
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