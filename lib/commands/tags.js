'use strict'

const { red } = require('../utils/colors.js')
const requester = require('../utils/requester.js')

const retrieveTags = () => {
  requester.retrieveTags()
    .then(tags => {
      console.info(JSON.parse(tags))
    })
    .catch(err => {
      console.error(red, err)
    })
}

module.exports = { retrieveTags }
