'use strict'
const status = require('http-status')

module.exports = (app, options) => {
    const {repo} = options
    
    app.get('/api/v1/data/current',(req, res, next) => {
        repo.getCurrentData().then(datas => {
            res.status(status.OK).json(datas)
        }).catch(next)
    })
}