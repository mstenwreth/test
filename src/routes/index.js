const express = require('express')
const logLevel = require('../api/logLevel')
const health = require('../api/health')
const apiV1 = require('./v1')

module.exports = (context) => {
    const router = express.Router()

    // No nesting because these are not versioned routes
    router.get('/health', health(context).get)
    router.get('/loglevel', logLevel(context).getLogLevel)
    router.post('/loglevel', logLevel(context).setLogLevel)

    router.use('/api/v1', apiV1(context))

    router.use('*', async (req, res, next) => {
        await context.loggers.warn(context.reqId, 'SERVICE_XXX', `Request to ${req?.baseUrl + req?.url}, but no such path defined`)
        return next()
    })

    // Error handler (should always be last)
    router.use(async (err, req, res, next) => {
        let statusCode = 500
        if (err instanceof CustomError) {
            statusCode = err.statusCode

            await context.loggers.info(res.locals.reqId, 'SERVICE_XXX',
                `Error occurred for ${req.url} but should have been logged earlier (with loglevel: ${err.level})`, err)
        } else {
            await context.loggers.error(res.locals.reqId, 'SERVICE_XXX', `Error occurred for ${req.url}`, err)
        }
        res.status(statusCode).send({ message: err.message })
    })

    return router
}