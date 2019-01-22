'use strict'

const requester = (process.env.ANDAGA_ENV === 'live')
  ? require('https')
  : require('http')

const auth = process.env.ANDAGA_AUTH
const url = (process.env.ANDAGA_ENV === 'live')
  ? process.env.ANDAGA_CORE_URL
  : 'localhost'

const options = {
  method: 'POST',
  hostname: url,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': auth
  }
}

process.env.ANDAGA_ENV === 'live'
  ? options['path'] = process.env.ANDAGA_LOG_ROUTE
  : options['port'] = 3000

const storeLog = log => {
  const req = requester.request(options, res => {
    const chunks = []
    res.on('data', data => chunks.push(data))
    res.on('end', () => {
      console.info(chunks.toString())
    })
  })
  req.on('error', (err) => {
    console.error(err)
  })
  req.write(JSON.stringify(log))
  req.end()
}

module.exports = { storeLog }
