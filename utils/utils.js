let utils = module.exports = {}

utils.isNumeric = n => {
  return !isNaN(parseFloat(n)) && isFinite(n)
}
