'use strict'

const { red } = require('../utils/colors.js')
const requester = require('../utils/requester.js')

const retrieveProjects = () => {
  requester.retrieveProjects()
    .then(projects => {
      console.info(JSON.parse(projects))
    })
    .catch(err => {
      console.error(red, err)
    })
}

module.exports = { retrieveProjects }
