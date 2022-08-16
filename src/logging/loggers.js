const moment = require('moment')
const config = require('exp-config')

const getTimestamp = () => moment().utc().format('YYYYMMDDTHHmmss[Z]')

const logLevelPriority = {
    ERROR: 1,
    WARN: 2,
    INFO: 3,
    DEBUG: 4,
    TRACE: 5
}

const logLevels = Object.keys(logLevelPriority)

let logLevel

const setLogLevel = (level) => {
    config.logLevel = level
    logLevel = undefined
}

const getLoglevel = () => {
    let level = 'TRACE' // default to lowest

    if (config.logLevel) {
        const configLogLevel = config.logLevel.toUpperCase()

        if (logLevels.includes(configLogLevel)) level = configLogLevel
    }

    return level
}

const shouldLog = (requestedLoglevel) => {
    if (!logLevel) logLevel = getLoglevel()
    return logLevelPriority[requestedLoglevel] <= logLevelPriority[logLevel]
}

const logFactory = (logLevel) => async (requestId, eventType, message, variables = []) => {
    if (process.env.NODE_ENV === 'test' || !shouldLog(logLevel)) return

    const timestamp = getTimestamp()

    variables = variables.length ? JSON.stringify(variables) : undefined

    let fn = 'log'
    if (logLevel === 'ERROR') fn = 'error'
    else if (logLevel === 'WARN') fn = 'warn'

    console[fn](timestamp, ':', logLevel.padEnd(5), ':', requestId, ':', eventType, ':', message, ':', variables)
}

/** @type {{
    error: (requestId: string, eventType: string, error: Error) => Promise<void>;
    warn: (requestId: string, eventType: string, message: string, variables?: any[] | any) => Promise<void>;
    info: (requestId: string, eventType: string, message: any, variables?: any[] | any) => Promise<void>;
    debug: (requestId: string, eventType: string, message: string, variables?: any[] | any) => Promise<void>;
    trace: (requestId: string, eventType: string, message: string, variables?: any[] | any) => Promise<void>;
}} */
module.exports = {
    error: logFactory('ERROR'),
    warn: logFactory('WARN'),
    info: logFactory('INFO'),
    debug: logFactory('DEBUG'),
    trace: logFactory('TRACE'),

    setLogLevel,
    getLoglevel,
    logLevels
}