const isNumeric = n => {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

const list = val => {
  return val.split(',')
}

const extractDate = date => {
  console.log(checkDate(date))

  // entryArray[0] = splitDate[0] + '-' + formatDateItem(Number(splitDate[1])) + '-' + formatDateItem(Number(splitDate[2]))
  // } else {
  //   let newDate = new Date()
  //   let year = newDate.getFullYear()
  //   let month = newDate.getMonth() + 1
  //   let day = newDate.getDate()
  //   entryArray[0] = year + '-' + formatDateItem(month) + '-' + formatDateItem(day)
  // }
}

const checkDate = date => {
  const splitDate = date.split('-')
  const checkDate = new Date(splitDate[0], splitDate[1] - 1, splitDate[2])
  return checkDate && (checkDate.getMonth() + 1) === Number(splitDate[1]) && splitDate[0].length === 4
}
module.exports = {
  isNumeric,
  list,
  extractDate
}
