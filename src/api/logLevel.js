const { InternalError } = require('../errors')

module.exports = (context) => {
  async function getLogLevel (req, res, next) {
    const reqId = context.reqId
    try {
      const logLevel = context.loggers.getLogLevel().toLowerCase()
      await context.loggers.info(reqId, 'SERVICE_XXX', `Retrieved log level as ${logLevel}`)
      res.status(200).json({ logLevel })
    } catch (error) {
      const message = `Error when trying to get log level: '${error.message}'`
      next(InternalError({ message, reqId, error }))
    }
  }
  async function setLogLevel (req, res, next) {
    let newLogLevel
    const reqId = context.reqId
    try {
      newLogLevel = req.body.logLevel || req.body.loglevel

      context.loggers.setLogLevel(newLogLevel)
      await context.loggers.info(reqId, 'SERVICE_XXX', `Changed log level to ${newLogLevel}`)
      res.status(200).json({ message: 'logLevel changed' })
    } catch (error) {
      const message = `Error when trying to set log level to ${newLogLevel}: '${error.message}'`
      next(InternalError({ message, reqId, error }))
    }
  }

  return {
    getLogLevel,
    setLogLevel
  }
}
