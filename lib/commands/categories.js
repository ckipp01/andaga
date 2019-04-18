'use strict'

const { red } = require('../utils/colors.js')
const requester = require('../utils/requester.js')

const retrieveCategories = () => {
  requester.retrieveCategories()
    .then(result => {
      console.info(JSON.parse(result))
    })
    .catch(err => {
      console.error(red, err)
    })
}

module.exports = { retrieveCategories }
