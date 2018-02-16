const Datastore = require('nedb')
const loadInitialData = require('../../_data/loadInitialData')

const dbConfig = { inMemoryOnly: true, autoload: true }

db              = {};
db.users     = new Datastore(dbConfig);
db.tweets      = new Datastore(dbConfig);


loadInitialData(db)

module.exports = () => db