const mongoose = require('mongoose')

let DB_URI = "mongodb://209.97.162.212:27017/tracking";

const getMongoURL = (options) => {
  const url = options.servers
    .reduce((prev, cur) => prev + cur + ',', `mongodb://${options.user}:${options.pass}@`)

  return `${url.substr(0,url.length - 1)}/${options.db}?replicaSet=${options.repl}&authSource=admin`
}

const connect = (options, mediator) => {  
  mediator.once('boot.ready', () => {
    mongoose.connect(DB_URI, function(err,res){
      mediator.emit('db.ready', res)
    })
  })
}

module.exports = Object.assign({}, {connect})

