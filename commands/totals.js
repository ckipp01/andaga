const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('gemynd.db')

const getTotals = (callback) => {
  const getAllData = 'SELECT * FROM gemynd'
  executeAndSort(getAllData, (data) => {
    callback(data)
  })
}

const executeAndSort = (query, callback) => {
  let totalsObject = {
    learn: {
      total: 0,
      monthTotal: {}
    },
    act: {
      total: 0,
      monthTotal: {}
    },
    rest: {
      total: 0,
      monthTotal: {}
    },
    social: {
      total: 0,
      monthTotal: {}
    },
    unassigned: {
      total: 0,
      monthTotal: {}
    },
    total: 0
  }
  db.each(query, (err, row) => {
    let monthName = getMonth(row.date)
    switch (row.category) {
      case 'learn':
        addMonthValues(totalsObject.learn.monthTotal, monthName, row.time)
        totalsObject.learn.total = totalsObject.learn.total + row.time
        totalsObject.total = totalsObject.total + row.time
        break
      case 'act':
        addMonthValues(totalsObject.act.monthTotal, monthName, row.time)
        totalsObject.act.total = totalsObject.act.total + row.time
        totalsObject.total = totalsObject.total + row.time
        break
      case 'rest':
        addMonthValues(totalsObject.rest.monthTotal, monthName, row.time)
        totalsObject.rest.total = totalsObject.rest.total + row.time
        totalsObject.total = totalsObject.total + row.time
        break
      case 'social':
        addMonthValues(totalsObject.social.monthTotal, monthName, row.time)
        totalsObject.social.total = totalsObject.social.total + row.time
        totalsObject.total = totalsObject.total + row.time
        break
      default:
        addMonthValues(totalsObject.unassigned.monthTotal, monthName, row.time)
        totalsObject.unassigned.total = totalsObject.unassigned.total + row.time
        totalsObject.total = totalsObject.total + row.time
        break
    }
  }, () => {
    callback(totalsObject)
  })
}

const getMonth = (date) => {
  let monthNumber = date.substring(date.indexOf('-') + 1, date.lastIndexOf('-'))
  let monthName = ''
  switch (monthNumber) {
    case '01':
      monthName = 'January'
      break
    case '02':
      monthName = 'February'
      break
    case '03':
      monthName = 'March'
      break
    case '04':
      monthName = 'April'
      break
    case '05':
      monthName = 'May'
      break
    case '06':
      monthName = 'June'
      break
    case '07':
      monthName = 'July'
      break
    case '08':
      monthName = 'August'
      break
    case '09':
      monthName = 'September'
      break
    case '10':
      monthName = 'October'
      break
    case '11':
      monthName = 'November'
      break
    case '12':
      monthName = 'December'
      break
    default:
      monthName = 'Unassigned'
      break
  }
  return monthName
}

const addMonthValues = (obj, month, time) => {
  if (!(obj.hasOwnProperty(month))) {
    obj[month] = time
  } else {
    obj[month] += time
  }
}

module.exports.getTotals = getTotals
