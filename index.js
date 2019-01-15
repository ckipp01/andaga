'use strict'

const program = require('commander')
const pkg = require('./package.json')
const log = require('./commands/dblog')

program
  .version(pkg.version)
  .command('log <type> <entry> <time>')
  .description('logs your entries')
  .option('-p | --project <project>', 'specifies the related project', list)
  .option('-d | --date <date>', 'specifies the date if it was not today')
  .option('-l | --place <place>', 'location activity was done')
  .action(log.dbLog)

program.parse(process.argv)

if (program.args.length === 0) {
  console.log('\n -|-|-|-|-|-  log and ándaga will remember  -|-|-|-|-|-\n |-|-|-|-|-  ask me to list and I will show  -|-|-|-|-|\n -|-|-|-  ask me to tell and I will do the math  |-|-|-\n |-|-|-|-  ask for help and it will be given  |-|-|-|-| ')
}
