'use strict'

const requester = (process.env.ANDAGA_ENV === 'live')
  ? require('https')
  : require('http')

const auth = process.env.ANDAGA_AUTH
const url = (process.env.ANDAGA_ENV === 'live')
  ? process.env.ANDAGA_CORE_URL
  : 'localhost'

const storeLog = log => {
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

const recall = amount => {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      hostname: url,
      headers: { 'Authorization': auth }
    }

    if (process.env.ANDAGA_ENV === 'live') {
      options['path'] = process.env.ANDAGA_LOG_ROUTE + '?amount=' + amount
    } else {
      options['path'] = '/?amount=' + amount
      options['port'] = 3000
    }

    const req = requester.request(options, res => {
      const chunks = []
      res.on('data', data => chunks.push(data))
      res.on('end', () => {
        resolve(chunks.toString())
      })
    })

    req.on('error', e => {
      reject(e)
    })
    req.end()
  })
}

const retrieveCategories = () => {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      hostname: url,
      headers: { 'Authorization': auth }
    }

    process.env.ANDAGA_ENV === 'live'
      ? options['path'] = process.env.ANDAGA_CATEGORIES_ROUTE
      : options['port'] = 3000

    const req = requester.request(options, res => {
      const chunks = []
      res.on('data', data => chunks.push(data))
      res.on('end', () => {
        resolve(chunks.toString())
      })
    })

    req.on('error', e => {
      reject(e)
    })
    req.end()
  })
}

const retrieveProjects = () => {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      hostname: url,
      headers: { 'Authorization': auth }
    }

    process.env.ANDAGA_ENV === 'live'
      ? options['path'] = process.env.ANDAGA_PROJECTS_ROUTE
      : options['port'] = 3000

    const req = requester.request(options, res => {
      const chunks = []
      res.on('data', data => chunks.push(data))
      res.on('end', () => {
        resolve(chunks.toString())
      })
    })

    req.on('error', e => {
      reject(e)
    })
    req.end()
  })
}

const retrieveTags = () => {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      hostname: url,
      headers: { 'Authorization': auth }
    }

    process.env.ANDAGA_ENV === 'live'
      ? options['path'] = process.env.ANDAGA_TAGS_ROUTE
      : options['port'] = 3000

    const req = requester.request(options, res => {
      const chunks = []
      res.on('data', data => chunks.push(data))
      res.on('end', () => {
        resolve(chunks.toString())
      })
    })

    req.on('error', e => {
      reject(e)
    })
    req.end()
  })
}

module.exports = {
  storeLog,
  recall,
  retrieveCategories,
  retrieveProjects,
  retrieveTags
}
