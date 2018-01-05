#!/usr/bin/env node
'use strict';

const program   = require('commander'),
        pkg     = require('./package.json'),
        fs      = require('fs'),
        sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('gemynd.db');


program
    .version(pkg.version)
    .command('log <entry> <time>')
    .description('Logs your entry')
    .option('-l | --learn', 'signify learning')
    .option('-a | --act', 'signifies action')
    .option('-r | --rest', 'signifies rest')
    .option('-d | --date <date>', 'specifies the date if it was not today')
    .option('-p | --place <place>', 'where thing was done')
    .action(log);

program.parse(process.argv);


function log(entry, time, options){
   
    let ea = []; //entryArray
    (options.date) ? ea[0] = options.date : ea[0] = new Date().toISOString().slice(0,10);
    if (options.learn) ea[1] = 'learn';
    if (options.act) ea[1] = 'act';
    if (options.rest) ea[1] = 'rest';
    ea[2] = time;
    ea[3] = entry;
    (options.place) ? ea[4] = options.place : null;

    console.log(ea);

    db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS gemynd (date TEXT, category TEXT, time INT, notes TEXT, place TEXT)");
        
          let stmt = db.prepare("INSERT INTO gemynd VALUES (?, ?, ?, ?, ?)");
            stmt.run(ea[0], ea[1], Number(ea[2]), ea[3], ea[4])
          
          stmt.finalize();
        
          db.each("SELECT rowid AS id, date, category, notes, place FROM gemynd", (err, row) => {
              console.log(row.id + " | " + row.date + " | " + row.category + " | " + row.time + " | " + row.notes + " | " + row.place);
          });
        });
        
        db.close();
}

 
