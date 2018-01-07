#!/usr/bin/env node
'use strict';

const program   = require('commander'),
        pkg     = require('./package.json'),
        log     = require('./dblog');

program
    .version(pkg.version)
    .command('log <entry> <time>')
    .description('Logs your entry')
    .option('-l | --learn', 'signifies learning')
    .option('-a | --act', 'signifies action')
    .option('-r | --rest', 'signifies rest')
    .option('-s | --social', 'signifies social')
    .option('-d | --date <date>', 'specifies the date if it was not today')
    .option('-p | --place <place>', 'location activity was done')
    .action(log.dbLog);

program.parse(process.argv);
