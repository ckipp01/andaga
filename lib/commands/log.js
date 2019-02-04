const helpers = require('../utils/helpers.js')
const requester = require('../utils/requester.js')

const log = (category, notes, time, options) => {
  const date = options.date
    ? helpers.verifyDate(options.date)
    : helpers.createDate()

  const log = {
    date: date,
    category: category,
    time: Number(time),
    notes: notes
  }

  if (options.location) {
    log['location'] = options.location
  }

  if (options.project) {
    log['project'] = options.project
  }

  if (options.tags) {
    log['tags'] = options.tags
  }

  requester.storeLog(log)
}

module.exports = { log }
