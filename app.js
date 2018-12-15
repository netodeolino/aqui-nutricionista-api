const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')

const indexRouter = require('./routes/index')
const usuarioRouter = require('./routes/usuario')

const app = express()

app.use(cors())
app.use(fileUpload())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/usuario', usuarioRouter)

module.exports = app
