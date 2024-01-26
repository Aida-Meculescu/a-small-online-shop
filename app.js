const path = require('path') // is a build in package
const express = require('express')
const csrf = require('csurf')
const expressSession = require('express-session')

const createSessionConfig = require('./config/session')
const db = require('./data/database')
const addCsrfTokenMiddleware = require('./middlewares/csrf-token')
const errorHandlerMiddleware = require('./middlewares/error-handler')
const checkAuthStatusMiddleware = require('./middlewares/check-auth')
const authRouters = require('./routes/auth.routes')
const productsRoutes = require('./routes/products.routes')
const baseRoutes = require('./routes/base.routes')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views')) // creat an absolute path that is reconize on every operating systems

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));
const sessionConfig = createSessionConfig()

app.use(expressSession(sessionConfig))
app.use(csrf()) // activate the csrf token before routes! / create the token
app.use(addCsrfTokenMiddleware) // here use the token in the global variable (locals)
app.use(checkAuthStatusMiddleware)

app.use(baseRoutes)
app.use(authRouters)
app.use(productsRoutes)

app.use(errorHandlerMiddleware)

db.connectToDatabase().then(function () { app.listen(3000, function (req, res) { console.log('Conn OK!') }) }).catch(function (error) {
    console.log("Failed to connect to the database!")
    console.log(error)
})
