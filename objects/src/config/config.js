const dbSettings = {
    db: process.env.DB || 'datas',
    user: process.env.DB_USER || 'pune',
    pass: process.env.DB_PASS || 'ABr4bEay',
    repl: process.env.DB_REPLS || 'rs1',
    servers : 'mongodb://pune:ABr4bEay@192.168.99.100:27017,192.168.99.101:27017,192.168.99.102:27017/datas?replicaSet=rs1&authSource=admin',
    dbParameters: () => ({
        native_parser: true
    }),
    serverParameters: () => ({
        poolSize: 5,
        socketoptions: {
            keepAlive: 300,
            connectTimeoutMS: 30000,
        }
    }),
    replsetParameters: (replset = 'rs1') => ({
        replicaSet: replset,
        auto_reconnect:false,
        poolSize: 10,
        socketoptions: {
            keepAlive: 300,
            connectTimeoutMS: 30000,
        }
    })
}

const serverSettings = {
    port: process.env.PORT || 3000,
    ssl: require('./ssl')
}

module.exports = Object.assign({}, { dbSettings, serverSettings })