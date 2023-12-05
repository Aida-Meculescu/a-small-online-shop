const path = require('path') // is a build in package
const express = require('express')
const csrf = require('csurf')

const db = require('./data/database')
const addCsrfTokenMiddleware = require('./middlewares/csrf-token')
const errorHandlerMiddleware = require('./middlewares/error-handler')
const authRouters = require('./routes/auth.routes')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views')) // creat an absolute path that is reconize on every operating systems

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));

app.use(csrf()) // activate the csrf token before routes! / create the token
app.use(addCsrfTokenMiddleware) // here use the token in the global variable (locals)
app.use(authRouters)

app.use(errorHandlerMiddleware)

db.connectToDatabase().then(function () { app.listen(3000, function (req, res) { console.log('Conn OK!') }) }).catch(function (error) {
    console.log("Failed to connect to the database!")
    console.log(error)
})
