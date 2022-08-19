const config = require('./config')

const loggers = require('./src/logging/loggers')
const server = require('./src')({ loggers }) // ({ inject logger and db? })

async function main (app, config) {
    app.listen(config.port, () => {
        console.log(`Running service [${config.name.toUpperCase()}] in environment: [${config.env}]`)
        console.log()
        console.log(`${config.name} Listening to http://localhost:${config.port}`)
    })
}

main(server, config)
    .catch(error => {
        console.error(error)
        process.exit(1)
    })