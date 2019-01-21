'use strict'
const https = require('https')

const auth = process.env.ANDAGA_AUTH
const url = process.env.ANDAGA_CORE_URL
const route = process.env.ANDAGA_LOG_ROUTE

const storeLog = log => {
  const options = {
    method: 'POST',
    hostname: url,
    path: route,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth
    }
  }

  const req = https.request(options, res => {
    const chunks = []
    res.on('data', data => chunks.push(data))
    res.on('end', () => {
      console.log(chunks.toString())
    })
  })
  req.on('error', (err) => {
    console.log(err)
  })
  console.log(JSON.stringify(log))
  req.write(JSON.stringify(log))
  req.end()
}

module.exports = { storeLog }
