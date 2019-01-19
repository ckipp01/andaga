const helpers = require('../utils/helpers.js')
const requester = require('../utils/requester.js')

const log = (type, entry, time, options) => {
  const date = options.date
    ? helpers.verifyDate(options.date)
    : helpers.createDate()

  const log = {
    type: type,
    entry: entry,
    time: Number(time),
    date: date
  }

  if (options.project) {
    log['project'] = options.project
  }

  if (options.location) {
    log['location'] = options.location
  }

  if (options.tag) {
    log['tags'] = options.tag
  }

  console.log(log)
  requester.storeLog(log)
}

module.exports = { log }
