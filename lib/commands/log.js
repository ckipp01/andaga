const helpers = require('../utils/helpers.js')
const requester = require('../utils/requester.js')

const log = (type, entry, time, options) => {
  const date = options.date
    ? helpers.verifyDate(options.date)
    : helpers.createDate()

  const log = {
    date: date,
    type: type,
    time: Number(time),
    entry: entry
  }

  if (options.location) {
    log['location'] = options.location
  }

  if (options.project) {
    log['project'] = options.project
  }

  if (options.tag) {
    log['tags'] = options.tag
  }

  requester.storeLog(log)
}

module.exports = { log }
