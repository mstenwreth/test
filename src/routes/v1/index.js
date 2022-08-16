const router = require('express').Router()

const { files } = require('../../api/v1')

module.exports = (context) => {
    
    /** FILES */
    router.post('/upload', files(context).upload)
    
    return router
}