'use strict'

const { isNumeric } = require('../utils/helpers.js')
const { red } = require('../utils/colors.js')
const requester = require('../utils/requester.js')

const recall = amount => {
  const queryAmount = typeof amount === 'undefined'
    ? 1
    : amount

  if (!isNumeric(queryAmount)) {
    console.error(red, 'Your amount must be a valid number')
    process.exit(9)
  }

  requester.recall(queryAmount)
    .then(result => {
      console.info(JSON.parse(result))
    })
    .catch(err => {
      console.errror(err)
    })
}

module.exports = { recall }
