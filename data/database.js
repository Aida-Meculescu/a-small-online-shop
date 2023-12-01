const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient

let database

async function connectToDatabase() {
    const client = await MongoClient.connect('mongodb://127.0.0.1:27017') // return a client object with internal information about the connection // we connect to the server
    database = client.db('online-shop') // we connect to the database!

}

function getDb() {
    if (!database) {
        throw new Error('You must connect first!') // create an error object if there is an error!
    }
}

module.exports = {
    connectToDatabase: connectToDatabase,
    getDb: getDb
}