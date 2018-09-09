const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('gemynd.db')
const where = require('./where')

const getInfo = (options) => {
  let tellQuery = 'SELECT SUM(time) FROM gemynd'
  where.form(tellQuery, options, (data) => {
    db.get(data, (err, row) => {
      if (err) {
        console.log(' -|- ándaga error -|- \n\n' + err)
      } else {
        let total = row[Object.keys(row)[0]]
        let whereQuery = data.replace(tellQuery, '')
        console.log('\n -|- ándaga has logged ' + total + ' minutes of time' + whereQuery + ' -|-')
      }
    })

    db.close()
  })
}

module.exports.getInfo = getInfo
