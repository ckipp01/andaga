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
    .option('-l | --learn', 'signifies learning')
    .option('-a | --act', 'signifies action')
    .option('-r | --rest', 'signifies rest')
    .option('-s | --social', 'signifies social')
    .option('-d | --date <date>', 'specifies the date if it was not today')
    .option('-p | --place <place>', 'location activity was done')
    .action(log);

program.parse(process.argv);

function log(entry, time, options){

    let ea = []; //entryArray
    let dbQuery = {};

    (options.date) ? ea[0] = options.date : ea[0] = new Date().toISOString().slice(0,10);
    if (options.learn) ea[1] = 'learn';
    if (options.act) ea[1] = 'act';
    if (options.rest) ea[1] = 'rest';
    ea[2] = time;
    ea[3] = entry;
    (options.place) ? ea[4] = options.place : null;

    dbQuery.createTable = "CREATE TABLE IF NOT EXISTS gemynd (date TEXT, category TEXT, time INT, notes TEXT, place TEXT)";
    dbQuery.insertEntry = "INSERT INTO gemynd VALUES ('" + ea[0] + "', '" + ea[1] + "', " + ea[2] + ", '" + ea[3] + "', '" + ea[4] + "')";

    db.serialize(() => {    
        db.run(dbQuery.createTable);
        db.run(dbQuery.insertEntry, (e) => {
            if (e === null) {
                jsonStore(dbQuery.insertEntry);
            } else (
                console.log(e)
            )
        });

          
        db.each("SELECT rowid AS id, date, category, time, notes, place FROM gemynd", (err, row) => {
            console.log(row.id + " | " + row.date + " | " + row.category + " | " + row.time + " | " + row.notes + " | " + row.place + '\n');
        });
    });
        
    db.close();
}

function jsonStore (entry, js, ) {

    let jlogs;
    if (fs.existsSync('./gemynd.json')) {
        jlogs = require('./gemynd.json');
        let numEntries = Object.keys(jlogs).length;
        jlogs[numEntries + 1] = entry
        console.log('exists');
    } else {
        jlogs = {1 : entry};
    }

    fs.writeFile('gemynd.json', JSON.stringify(jlogs), 'utf8', (err) => {
        if (err) throw err;
        console.log('ándaga remembers');
    });

}


