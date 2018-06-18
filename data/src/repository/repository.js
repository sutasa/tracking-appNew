'use strict'

const repository = (db) => {

    const collection = db.collection('data')

    const getCurrentData = () => {
        return new Promise((resolve, reject) => {
            const data = []
            const cursor = collection.find().sort({'ts':-1}).limit(1)
            const addData = (datum) => {
                data.push(datum)
            }
            const sendData = (err) => {
                if(err){
                    reject(new Error('An error occured fetching all data, err:' + err))
                }
                resolve(data.slice())
            }
            cursor.forEach(addData, sendData)
        })
    }

    const disconnect = () => (
        db.close()
    )

    return Object.create({
        getCurrentData,
        disconnect
    })
}

const connect = (connection) => {
    return new Promise((resolve, reject) => {
        if(!connection) {
            reject(new Error('connection db not supplied!'))
        }
        resolve(repository(connection))
    })
}

module.exports = Object.assign({}, {connect})