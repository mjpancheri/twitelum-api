const Datastore = require('nedb')

db              = {};
db.users     = new Datastore('_data/users.db');
db.likes      = new Datastore('_data/likes.db');
db.tweets      = new Datastore('_data/tweets.db');

db.users.loadDatabase()
db.likes.loadDatabase()
db.tweets.loadDatabase()

module.exports = () => db