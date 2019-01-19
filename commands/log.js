const helper = require('../utils/helper')

const log = (type, entry, time, options) => {
  const date = options.date
    ? helper.verifyDate(options.date)
    : helper.createDate()

  const log = {
    type: type,
    entry: entry,
    time: time,
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
  // make call to andaga-core
}

module.exports = { log }
