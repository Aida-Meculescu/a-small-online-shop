const expressSession = require('express-session')
const mongoDbStore = require('connect-mongodb-session')

function createSessionStore() {
    const MongoDBStore = mongoDbStore(expressSession) // create a new mongoDb Store that can be use in our session

    const store = new MongoDBStore({ // this is a constructor 
        uri: 'mongodb://127.0.0.1:27017',
        databaseName: 'online-shop',
        collection: 'sessions'
    })

    return store
}

function createSessionConfig() {
    // create a configuration for my session
    return {
        secret: 'super-secret',
        resave: false,
        saveUninitialized: false,
        store: createSessionStore(),
        cookie: {
            maxAge: 2 * 24 * 60 * 60 * 1000
        }
    }
}

module.exports = createSessionConfig