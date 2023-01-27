const client = require('../helpers/init_redis')

const incr = key => {
    return new Promise((resolve, reject) => {
        client.incr(key, (error, result) => {
            if (error) reject(error)
            resolve(result)
        })
    })
}

const expire = (key, ttl) => {
    console.log(`Redis set expire key: ${key} ttl: ${ttl}`)
    return new Promise((resolve, reject) => {
        client.expire(key, ttl, (error, result) => {
            if (error) reject(error)
            resolve(result)
        })
    })
}

const ttl = key => {
    return new Promise((resolve, reject) => {
        client.ttl(key, (error, result) => {
            if (error) reject(error)
            resolve(result)
        })
    })
}

module.exports = {
    incr,
    expire,
    ttl
}