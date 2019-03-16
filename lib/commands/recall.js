const { isNumeric } = require('../utils/helpers.js')
const requester = require('../utils/requester.js')

const recall = amount => {
  const queryAmount = typeof amount === 'undefined'
    ? 1
    : amount

  if (!isNumeric(queryAmount)) {
    throw Error('Your amount must be a valid number')
  }

  requester.recall(queryAmount)
    .then(result => {
      console.info(JSON.parse(result))
    })
    .catch(err => {
      throw Error(err)
    })
}

module.exports = { recall }
