const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('gemynd.db')
const where = require('./where')
const utils = require('../utils/utils')

const formListQuery = (amount, number, options) => {
  let listQuery = 'SELECT rowid AS id, date, category, time, notes, place FROM gemynd'
  let queryLimit

  if (number) {
    if (!utils.isNumeric(number)) {
      console.log(`\n -|-|-|- ${number} should be a number -|-|-|- \n`)
      console.log('-|-|-|- ándaga will default to 10 -|-|-|-')
      queryLimit = false
    } else {
      queryLimit = `LIMIT ${number}`
    } 
  } else {
    queryLimit = false 
  }

  where.form(listQuery, options, (data) => {
    if (amount === 'some') {
      (queryLimit) ? listQuery = data + ' ORDER BY date DESC ' + queryLimit : listQuery = data + ' ORDER BY date DESC LIMIT 10'
      getEntries(listQuery)
    } else if (amount === 'all') {
      getEntries(data + ' ORDER by date DESC')
    } else {
      console.log('\n -|-|-|- ándaga will tell you some or all but no other -|-|-|-')
    }
  })
}

const getEntries = (query) => {
  console.log('\n')
  db.each(query, (err, row) => {
    if (err) {
      console.log(' -|- ándaga error -|- \n\n' + err)
    } else {
      console.log(row.date + ' -|- ' + row.category + ' -|- ' + row.time + ' -|- ' + row.notes + ' -|- ' + row.place + '\n')
    }
  })

  db.close()
}

module.exports.formListQuery = formListQuery
