const JSONlog = require('./jsonlog')
const utils = require('../utils/utils')

const log = (type, entry, time, options) => {
  console.log(type)
  console.log(entry)
  console.log(time)
  console.log(options.project)
  console.log(options.date)
  console.log(options.location)
  console.log(options.tag)

  let entryArray = []
  let dbQuery = {}

  const date = options.date ?
    utils.extractDate(options.date) :
    utils.createDate()
  console.log(date)
  return
  if (options.learn) entryArray[1] = 'learn'
  if (options.act) entryArray[1] = 'act'
  if (options.rest) entryArray[1] = 'rest'
  if (options.social) entryArray[1] = 'social'
  entryArray[2] = time
  entryArray[3] = entry.replace("'", "''")
  if (options.place) {
    entryArray[4] = options.place.replace("'", "''")
  }

  dbQuery.createTable = 'CREATE TABLE IF NOT EXISTS gemynd (date TEXT, category TEXT, time INT, notes TEXT, place TEXT)'
  dbQuery.insertEntry = "INSERT INTO gemynd VALUES ('" + entryArray[0] + "', '" + entryArray[1] + "', " + entryArray[2] + ", '" + entryArray[3] + "', '" + entryArray[4] + "')"

  db.serialize(() => {
    db.run(dbQuery.createTable)
    db.run(dbQuery.insertEntry, (data) => {
      if (data === null) {
        JSONlog.JSONStore(dbQuery.insertEntry)
      } else {
        console.log(data)
      }
    })
  })

  db.close()
}

const formatDateItem = (num) => {
  if (num < 10) {
    return '0' + num
  } else {
    return num
  }
}

module.exports = { log }
