'use strict'

const program = require('commander')
const pkg = require('./package.json')
const log = require('./commands/log')
const helper = require('./utils/helper')

program
  .version(pkg.version)
  .command('log <type> <entry> <time>')
  .description('logs your entries')
  .option('-p | --project <project>', 'specifies the related project')
  .option('-d | --date <date>', 'specifies the date if it was not today')
  .option('-l | --location <location>', 'specifies location activity was done')
  .option('-t | --tag <tag>', 'specifies related projects or tasks', helper.list)
  .action(log.log)

program.parse(process.argv)

if (program.args.length === 0) {
  console.log('\n -|-|-|-|-|-  log and ándaga will remember  -|-|-|-|-|-\n |-|-|-|-|-  ask me to list and I will show  -|-|-|-|-|\n -|-|-|-  ask me to tell and I will do the math  |-|-|-\n |-|-|-|-  ask for help and it will be given  |-|-|-|-| ')
}
