const JSONlog = require('./jsonlog')

const dbLog = (entry, time, options) => {
  console.log(entry)
  console.log(time)
  console.log(options)
  exit
  let entryArray = []
  let dbQuery = {}

  if (options.date) {
    let splitDate = options.date.split('-')
    if (splitDate.length !== 3 || splitDate[0].length !== 4) {
      console.log('Not a valid date format')
      return
    } else {
      entryArray[0] = splitDate[0] + '-' + formatDateItem(Number(splitDate[1])) + '-' + formatDateItem(Number(splitDate[2]))
    }
  } else {
    let newDate = new Date()
    let year = newDate.getFullYear()
    let month = newDate.getMonth() + 1
    let day = newDate.getDate()
    entryArray[0] = year + '-' + formatDateItem(month) + '-' + formatDateItem(day)
  }
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

module.exports.dbLog = dbLog
