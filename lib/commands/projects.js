const requester = require('../utils/requester.js')

const retrieveProjects = () => {
  requester.retrieveProjects()
    .then(projects => {
      console.info(JSON.parse(projects))
    })
    .catch(err => {
      throw Error(err)
    })
}

module.exports = { retrieveProjects }
