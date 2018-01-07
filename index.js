#!/usr/bin/env node
'use strict';

const program   = require('commander'),
        pkg     = require('./package.json'),
        log     = require('./dblog'),
        list    = require('./list'),
        tell    = require('./tell');


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
    .action(list.getEntries)

program
    .command('tell all')
    .description('tells you stats on your entries')
    .option('-l | --learn', 'signifies learning')
    .option('-a | --act', 'signifies action')
    .option('-r | --rest', 'signifies rest')
    .option('-s | --social', 'signifies social')
    .option('-d | --date <date>', 'specifies the date')
    .option('-p | --place <place>', 'location activity was done')
    .action(tell.getInfo)

program.parse(process.argv);

if (program.args.length === 0) 
    console.log('\n -|-|-|- log and ándaga will remember -|-|-|-\n  -|-|- ask me to list and I will show -|-|-\n -|-|- ask me to tell and I will do the math |-|-|-\n -|-|- ask for help and it will be given -|-|- ')