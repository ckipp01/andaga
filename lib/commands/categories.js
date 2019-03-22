const requester = require('../utils/requester.js')

const retrieveCategories = () => {
  requester.retrieveCategories()
    .then(result => {
      console.info(JSON.parse(result))
    })
    .catch(err => {
      throw Error(err)
    })
}

module.exports = { retrieveCategories }
