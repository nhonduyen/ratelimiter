const redis = require('redis')

const client = redis.createClient({
    port: 6379,
    host: '127.0.0.1',
    legacyMode: true
})

client.on('connect', () => {
    console.log('Redis connected')
})

client.on('error', err => {
    console.log('Error ' + err)
})

client.connect()

module.exports = client