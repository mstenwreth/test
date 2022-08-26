
module.exports = (context) => {
    async function get (req, res) {
      res.set('Cache-Control', 'no-cache')
      try {
        // await context.db.sequelize.authenticate().catch(error => {
        //  throw error
        // })
  
        await context.loggers.info(req.rid, `${context.config.name.toUpperCase()}`, `${req.url}`)
        res.status(200).json({ status: 'healthy' })
      } catch (error) {
        await context.loggers.error(res.locals.reqId, `${context.config.name.toUpperCase() + '_ERROR'}`, `Error occurred for ${req.url}`, error)
        res.status(200).json({ status: 'unhealthy' })
      }
    }
  
    return {
      get
    }
  }
  