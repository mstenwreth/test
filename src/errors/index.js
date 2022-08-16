const log = require('../logging/loggers')
class CustomError extends Error {
    constructor({ name, errorType, message, reqId, statusCode, level, innerError }) {
        super()
        this.name = name
        const { message: innerMessage, stack, ...otherProperties } = innerError ?? {}
        this.innerError = { message: innerMessage, stack, ...otherProperties }
        this.message = message
        this.reqId = reqId
        this.statusCode = statusCode
        this.level = level || 'error'

        if (typeof log[this.level] !== 'function') {
            log.warn(reqId, 'SERVICE_XXX', `level ${level} is not a valid level`)
            this.level = 'error'
        }

        log[this.level](reqId, errorType, message, { stackTrace: this.stack.toString(), innerError: this.innerError })
    }
}

class InternalError extends CustomError {
    constructor({ message, reqId, innerError }) {
        super({
            errorType: 'INTERNAL_ERROR',
            name: 'InternalError',
            message,
            reqId,
            statusCode: 500,
            level: 'error',
            innerError
        })
    }
}

class NotFoundError extends CustomError {
    constructor({ message, reqId }) {
        super({
            errorType: 'INVALID_REQUEST',
            name: 'NotFoundError',
            message,
            reqId,
            statusCode: 404,
            level: 'warn'
        })
    }
}

module.exports = {
    CustomError,
    InternalError,
    NotFoundError
}