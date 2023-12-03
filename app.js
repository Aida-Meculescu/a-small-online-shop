const path = require('path') // is a build in package
const express = require('express')

const db = require('./data/database')
const authRouters = require('./routes/auth.routes')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views')) // creat an absolute path that is reconize on every operating systems

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));

app.use(authRouters)

db.connectToDatabase().then(function () { app.listen(3000, function (req, res) { console.log('Conn OK!') }) }).catch(function (error) {
    console.log("Failed to connect to the database!")
    console.log(error)
})
