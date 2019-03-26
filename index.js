'use strict'

const andaga = require('./package.json')
const helper = require('./lib/utils/helpers.js')
const { log } = require('./lib/commands/log')
const program = require('commander')
const { recall } = require('./lib/commands/recall.js')
const { retrieveCategories } = require('./lib/commands/categories.js')
const { retrieveProjects } = require('./lib/commands/projects.js')
const { retrieveTags } = require('./lib/commands/tags.js')

program
  .version(andaga.version)
  .command('categories')
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
  .command('projects')
  .description('provides a list of projects that have been logged so far')
  .action(retrieveProjects)

program
  .command('recall [amount]')
  .description('recalls your latest entries')
  .action(recall)

program
  .command('tags')
  .description('provides a list of tags that have been used so far')
  .action(retrieveTags)

program
  .command('*')
  .action(() => console.error(`I'm sorry, but I don't know this command`))

program.parse(process.argv)

if (program.args.length === 0) {
  console.log('\n ándaga')
}
