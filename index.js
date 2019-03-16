'use strict'

const andaga = require('./package.json')
const { retrieveCategories } = require('./lib/commands/category.js')
const helper = require('./lib/utils/helpers.js')
const { log } = require('./lib/commands/log')
const program = require('commander')
const { recall } = require('./lib/commands/recall')

program
  .version(andaga.version)
  .command('category')
  .description('provides a list of categories that have been used so far')
  .action(retrieveCategories)

program
  .command('log <category> <notes> <time>')
  .description('logs your entries')
  .option('-d | --date <date>', 'specifies the date if it was not today')
  .option('-l | --location <location>', 'specifies location activity was done')
  .option('-p | --project <project>', 'specifies the related project')
  .option('-t | --tags <tags>', 'specifies related projects or tasks', helper.list)
  .action(log)

program
  .command('recall [amount]')
  .description('recalls your latest entries')
  .action(recall)

program.parse(process.argv)

if (program.args.length === 0) {
  console.log('\n ándaga')
}
