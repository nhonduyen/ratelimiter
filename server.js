const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3000
const { incr, expire, ttl } = require('./models/limiter')

app.use(express.static('public'))

app.get('/', (req,res, next) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.get('/api', async (req, res, next) => {
    try {
        const ip = '128.0.0.1'
        const ip1 = req.headers['x-forwarded-for'] || req.connection.remoteAddress
        //console.log(req.headers['x-forwarded-for'], req.connection.remoteAddress)
        const numRequest = await incr(ip)
        let timeToLive

        if (numRequest === 1) {
            await expire(ip, 20)
            timeToLive = 20 // 20s
        } else {
            timeToLive = await ttl(ip)
        }
        console.log(`Redis get ttl key: ${ip} TTL: ${timeToLive}`)

        if (numRequest > 20) {
            return res.status(503).json({
                status: 'error',
                numRequest: numRequest,
                ttl: timeToLive,
                message: 'server is busy'
            })
        }

        res.json({
            status: 'success',
            numRequest: numRequest
        })
    } catch (error) {
        throw new Error(error)
    }
})

app.listen(PORT, () => {
    console.log('The server is running at ' + PORT)
})