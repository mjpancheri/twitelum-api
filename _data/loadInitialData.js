function loadInitialData(db) {
    db.users.insert(require('./users.json'))
    db.tweets.insert(require('./tweets.json'))
}

module.exports = (db) => loadInitialData(db)