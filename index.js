#!/usr/bin/env node
'use strict';

const program   = require('commander'),
        pkg     = require('./package.json');


program
    .version(pkg.version)
    .command('log <entry> <time>')
    .description('Logs your entry')
    .option('-l | --learn', 'signify learning')
    .option('-a | --act', 'signifies action')
    .option('-r | --rest', 'signifies rest')
    .action(log);

program.parse(process.argv);


function log(entry, time, options){
    // options.options.forEach(e => {
    //     console.log(e);
    // });
    if (options.learn) console.log('learn');
    if (options.act) console.log('act');
    if (options.rest) console.log('rest');

    console.log(entry);
    console.log(time);
}
    