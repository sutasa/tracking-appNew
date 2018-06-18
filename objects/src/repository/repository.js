'use strict'

const repository = (db) => {

    const collection = db.collection('objects')

    const getAllObjects = () => {
        return new Promise((resolve, reject) => {
            const objects = []
            const cursor = collection.find({})
            const addObject = (object) => {
                objects.push(object)
            }
            const sendObjects = (err) => {
                if(err){
                    reject(new Error('An error occured fetching all objects, err:' + err))
                }
                resolve(objects.slice())
            }
            cursor.forEach(addObject, sendObjects)
        })
    }

    const disconnect = () => (
        db.close()
    )

    return Object.create({
        getAllObjects,
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