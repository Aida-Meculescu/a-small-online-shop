const express = require('express')

const authRouters = require('./routes/auth.routes')

const app = express()

app.use(authRouters)

app.listen(3000)