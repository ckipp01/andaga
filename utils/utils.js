const isNumeric = n => {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

const list = (val) => {
  return val.split(',')
}

module.exports = {
  isNumeric,
  list
}
