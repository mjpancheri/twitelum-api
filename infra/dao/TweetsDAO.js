class TweetsDAO {
    constructor(app) {
        this.dbTweets = app.infra.config.db.tweets
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
        return new Promise((resolve, reject) => {
            this.dbTweets.insert(tweet, (err, data) => {
                if(err) {
                    reject(err)
                }
                resolve(data)
            })
        })
    }
    
    buscaTodasHashtags() {
        return new Promise((resolve, reject) => {
            this.dbTweets.find({"conteudo": /#/} , function(err, data) {
                if(err) {
                    reject(err)
                }
                resolve(data)
            })
        })
    }

    buscaUmaHashtag(nomeHashtag) {
        return new Promise((resolve, reject) => {
            this.dbTweets.find({"conteudo": new RegExp(`#${nomeHashtag}[ -]{1}`)} , function(err, data) {
                if(err) {
                    reject(err)
                }
                resolve(data)
            })
        })
    }

    toggleLike(tweetInfo) { // Colocar uma camada antes
        return this.buscaUm(tweetInfo.id)
                    .then((tweet) => {
                        const liker = tweetInfo.tweet.usuario.login
                        const isLiked = tweet.likes.find((like) => like.usuario.login === liker )
                        console.log(tweet.likes)
                        if(isLiked) {
                            console.log('Remove like')
                            const updatedLikes = tweet.likes.filter((like) => like.usuario.login !== liker )
                            return this.removeLike(tweetInfo, updatedLikes)
                        } else {
                            console.log('Insere like')
                            return this.insereLike(tweetInfo)
                        }
                    })
    }
                
    insereLike(tweetInfo) {
        return new Promise((resolve, reject) => {
            this.dbTweets.update({ "_id": tweetInfo.id }, { $push: { likes: tweetInfo.tweet } }, {}, (err, data) => {
                if(data === 0) {
                    const error = new Error('Tweet não encontrado')
                    error.status = 404
                    reject(error)
                }
                console.log('Deu certo!', data)
                resolve(data)
            })            
        })
    }
    removeLike(tweetInfo, updatedLikes) {
        return new Promise((resolve, reject) => {
            this.dbTweets.update({ "_id": tweetInfo.id }, { $set: { likes: updatedLikes } }, {}, (err, data) => {
                if(data === 0) {
                    const error = new Error('Tweet não encontrado')
                    error.status = 404
                    reject(error)
                }
                console.log('Deu certo!', data)
                resolve(data)
            })            
        })            
    }
}

module.exports = (app) => new TweetsDAO(app)