const filesystem = require('fs')

let backup = module.exports = {}

backup.duplicate = () => {
  if (filesystem.existsSync('./gemynd.json')) {
    let dateObj = new Date()
    let month = dateObj.getUTCMonth() + 1
    let day = dateObj.getUTCDate()
    let year = dateObj.getUTCFullYear()
    let date = year + '-' + month + '-' + day
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
