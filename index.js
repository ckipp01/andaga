#!/usr/bin/env node
'use strict';

const program       = require('commander'),
        pkg         = require('./package.json'),
        log         = require('./commands/dblog'),
        list        = require('./commands/list'),
        tell        = require('./commands/tell'),
        populate    = require('./commands/populate'),
        backup      = require('./commands/backup'),
        summarize   = require('./commands/summarize');


program
    .version(pkg.version)
    .command('log <entry> <time>')
    .description('logs your entries')
    .option('-l | --learn', 'signifies learning')
    .option('-a | --act', 'signifies action')
    .option('-r | --rest', 'signifies rest')
    .option('-s | --social', 'signifies social')
    .option('-d | --date <date>', 'specifies the date if it was not today')
    .option('-p | --place <place>', 'location activity was done')
    .action(log.dbLog);

program
    .command('list <amount> [number]')
    .description('lists your entries')
    .option('-l | --learn', 'signifies learning')
    .option('-a | --act', 'signifies action')
    .option('-r | --rest', 'signifies rest')
    .option('-s | --social', 'signifies social')
    .option('-d | --date <date>', 'specifies the date')
    .option('-p | --place <place>', 'location activity was done')
    .action(list.formListQuery)

program
    .command('tell')
    .description('tells you stats on your entries')
    .option('-l | --learn', 'signifies learning')
    .option('-a | --act', 'signifies action')
    .option('-r | --rest', 'signifies rest')
    .option('-s | --social', 'signifies social')
    .option('-d | --date <date>', 'specifies the date')
    .option('-p | --place <place>', 'location activity was done')
    .action(tell.getInfo)

program
    .command('populate')
    .description('runs through the json and populates the db')
    .action(populate.populate)

program
    .command('backup')
    .description('backs up your json file')
    .action(backup.duplicate)

program
    .command('summarize')
    .description('dashboard time')
    .action(summarize.createDashboard)

program.parse(process.argv);

if (program.args.length === 0) 
    console.log('\n -|-|-|-|-|-  log and ándaga will remember  -|-|-|-|-|-\n |-|-|-|-|-  ask me to list and I will show  -|-|-|-|-|\n -|-|-|-  ask me to tell and I will do the math  |-|-|-\n |-|-|-|-  ask for help and it will be given  |-|-|-|-| ')