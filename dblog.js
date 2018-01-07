const sqlite3   = require('sqlite3').verbose(),
        db      = new sqlite3.Database('gemynd.db'),
        JSONlog = require('./jsonlog');

const dbLog = (entry, time, options) => {

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
                JSONlog.JSONStore(dbQuery.insertEntry);
            } else (
                console.log(e)
            )
        });
    });
        
    db.close();
}

module.exports.dbLog = dbLog;