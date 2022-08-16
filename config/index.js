const packageJson = require('../package.json')
const baseConf = require('exp-config')

module.exports = {
    name: packageJson.name,
    country: process.env.country || 'se',
    fullName: `${packageJson.name}:${packageJson.version}`,
    ...baseConf
}