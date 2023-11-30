const path = require('path') // is a build in package
const express = require('express')

const authRouters = require('./routes/auth.routes')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views')) // creat an absolute path that is reconize on every operating systems

app.use(authRouters)

app.listen(3000)