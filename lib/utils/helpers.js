const isNumeric = n => {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

const list = val => {
  return val.split(',')
}

const verifyDate = date => {
  if (checkDate(date)) {
    return date
  } else {
    console.error('unknown date format')
    process.exit(9)
  }
}

const padDate = number => number < 10 ? '0' + number : number

const createDate = () => {
  const newDate = new Date()
  const year = newDate.getFullYear()
  const month = newDate.getMonth() + 1
  const day = newDate.getDate()
  return year + '-' + padDate(month) + '-' + padDate(day)
}

const checkDate = date => {
  const splitDate = date.split('-')
  const checkDate = new Date(splitDate[0], splitDate[1] - 1, splitDate[2])
  return checkDate && (checkDate.getMonth() + 1) === Number(splitDate[1]) && splitDate[0].length === 4
}

module.exports = {
  isNumeric,
  list,
  verifyDate,
  createDate
}
