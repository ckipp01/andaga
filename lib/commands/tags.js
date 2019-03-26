const requester = require('../utils/requester.js')

const retrieveTags = () => {
  requester.retrieveTags()
    .then(tags => {
      console.info(JSON.parse(tags))
    })
    .catch(err => {
      throw Error(err)
    })
}

module.exports = { retrieveTags }
