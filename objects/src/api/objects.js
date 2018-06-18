'use strict'
const status = require('http-status')

module.exports = (app, options) => {
    const {repo} = options
    
    app.get('/api/v1/objects',(req, res, next) => {
        repo.getAllObjects().then(datas => {
            res.status(status.OK).json(datas)
        }).catch(next)
    })
}