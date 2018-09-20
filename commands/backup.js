const filesystem = require('fs')

let backup = module.exports = {}

backup.duplicate = () => {
  if (filesystem.existsSync('./gemynd.json')) {
    const dateObj = new Date()
    const month = dateObj.getUTCMonth() + 1
    const day = dateObj.getUTCDate()
    const year = dateObj.getUTCFullYear()
    const date = year + '-' + month + '-' + day
    filesystem.copyFile('gemynd.json', 'backups/' + date + '-gemynd.json', (err) => {
      if (err) {
        console.log('\n -|- ándaga error -|- \n\n')
        throw err
      } else {
        console.log('\n -|- ándaga backup successful -|-')
      }
    })
  }
}
