const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const hbs = require('hbs');
const app = express()
const port = process.env.PORT || 3000
const configDB = require('./app/config/db.js')
mongoose.connect(configDB.url)

app.use(morgan('dev'))
app.set('view engine', 'hbs')
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const routesCfg = require('./app/config/routes.js')(app,hbs)

app.listen(port)
console.log(`Listening on :${port}\n`)
