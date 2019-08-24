'use strict'

const { blue, red } = require('./colors.js')
const request = require('request')

const auth = process.env.ANDAGA_AUTH
const url = (process.env.ANDAGA_ENV === 'live')
  ? process.env.ANDAGA_CORE_URL
  : 'http://localhost'

const storeLog = log => {
  const path = process.env.ANDAGA_ENV === 'live'
    ? process.env.ANDAGA_LOG_ROUTE
    : ':3000'

  const options = {
    method: 'POST',
    url: url + path,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth
    },
    body: JSON.stringify(log)
  }

  request.post(options, (error, _, body) => {
    error
      ? console.error(red, error)
      : console.info(blue, body)
  })
}

const recall = amount => {
  return new Promise((resolve, reject) => {
    const path = process.env.ANDAGA_ENV === 'live'
      ? process.env.ANDAGA_LOG_ROUTE + '?amount=' + amount
      : ':3000?amount=' + amount

    const options = {
      method: 'GET',
      url: url + path,
      headers: { 'Authorization': auth }
    }

    request.get(options, (error, _, body) => {
      error
        ? reject(error)
        : resolve(body)
    })
  })
}

const retrieveCategories = () => {
  return new Promise((resolve, reject) => {
    const path = process.env.ANDAGA_ENV === 'live'
      ? process.env.ANDAGA_CATEGORIES_ROUTE
      : ':3000'

    const options = {
      method: 'GET',
      url: url + path,
      headers: { 'Authorization': auth }
    }

    request.get(options, (error, _, body) => {
      error
        ? reject(error)
        : resolve(body)
    })
  })
}

const retrieveProjects = () => {
  return new Promise((resolve, reject) => {
    const path = process.env.ANDAGA_ENV === 'live'
      ? process.env.ANDAGA_PROJECTS_ROUTE
      : ':3000'

    const options = {
      method: 'GET',
      url: url + path,
      headers: { 'Authorization': auth }
    }

    request.get(options, (error, _, body) => {
      error
        ? reject(error)
        : resolve(body)
    })
  })
}

const retrieveTags = () => {
  return new Promise((resolve, reject) => {
    const path = process.env.ANDAGA_ENV === 'live'
      ? process.env.ANDAGA_TAGS_ROUTE
      : ':3000'

    const options = {
      method: 'GET',
      url: url + path,
      headers: { 'Authorization': auth }
    }

    request.get(options, (error, _, body) => {
      error
        ? reject(error)
        : resolve(body)
    })
  })
}

module.exports = {
  storeLog,
  recall,
  retrieveCategories,
  retrieveProjects,
  retrieveTags
}
