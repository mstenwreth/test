const express = require('express')
const routes = require('./routes')
const { v4: uuidv4 } = require('uuid')
const cors = require('cors')
const bodyParser = require('body-parser')

function createApp(context) {
    const app = express()

    context.config = context.config || require('../config')
    context.now = context.now ?? (() => { return new Date() })
    context.reqId = context.reqId || uuidv4() // should be set by nginx/headers but not in this case

    app.use(cors())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    const fileUpload = require('express-fileupload')
    app.use(fileUpload())
    app.use('/client', express.static('public'))
    app.use(routes(context))

    return app
}

module.exports = createApp