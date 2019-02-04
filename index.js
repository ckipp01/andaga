'use strict'

const helper = require('./lib/utils/helpers.js')
const log = require('./lib/commands/log').log
const program = require('commander')
const recall = require('./lib/commands/recall').recall

program
  .command('log <category> <notes> <time>')
  .description('logs your entries')
  .option('-d | --date <date>', 'specifies the date if it was not today')
  .option('-l | --location <location>', 'specifies location activity was done')
  .option('-p | --project <project>', 'specifies the related project')
  .option('-t | --tags <tags>', 'specifies related projects or tasks', helper.list)
  .action(log)

program
  .command('recall')
  .description('recalls your latest entries')
  .option('-d | --date <date>', 'recalls entries on a specific date')
  .option('-l | --location <location>', 'recalls entries on a certain day')
  .option('-p | --project <project>', 'recalls entries on a certain project')
  .option('-ts | --tags <tag>', 'recalls entries related to certain tags')
  .action(recall)

program.parse(process.argv)

if (program.args.length === 0) {
  console.log('\n ándaga')
}
