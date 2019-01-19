'use strict'

const requester = (process.env.NODE_ENV === 'production')
  ? require('https')
  : require('http')

const storeLog = log => {
  const options = {
    method: 'POST',
    host: 'localhost',
    port: 3000,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const req = requester.request(options, res => {
    const chunks = []
    res.on('data', data => chunks.push(data))
    res.on('end', () => {
      console.log(chunks.toString())
    })
  })
  req.on('error', (err) => {
    console.log(err)
  })
  req.write(JSON.stringify(log))
  req.end()
}

module.exports = { storeLog }
