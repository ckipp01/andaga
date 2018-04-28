const sqlite3   = require('sqlite3').verbose(),
        db      = new sqlite3.Database('gemynd.db'),
        JSONlog = require('./jsonlog');

const dbLog = (entry, time, options) => {

    let ea = []; //entryArray
    let dbQuery = {};

    if (options.date) {
        splitDate = options.date.split('-');
        if (splitDate.length !== 3 || splitDate[0].length !== 4) {
            console.log('Not a valid date format');
            return
        } else {
            console.log(splitDate);
            ea[0] = splitDate[0] + '-' + formatDateItem(Number(splitDate[1])) + '-' + formatDateItem(Number(splitDate[2]));
        }
    } else {
        let d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let day = d.getDate();
        ea[0] = year + '-' + formatDateItem(month) + '-' + formatDateItem(day);
    }
    if (options.learn) ea[1] = 'learn';
    if (options.act) ea[1] = 'act';
    if (options.rest) ea[1] = 'rest';
    if (options.social) ea[1] = 'social';
    ea[2] = time;
    ea[3] = entry.replace("'","''");
    (options.place) ? ea[4] = options.place.replace("'","''") : null;

    dbQuery.createTable = "CREATE TABLE IF NOT EXISTS gemynd (date TEXT, category TEXT, time INT, notes TEXT, place TEXT)";
    dbQuery.insertEntry = "INSERT INTO gemynd VALUES ('" + ea[0] + "', '" + ea[1] + "', " + ea[2] + ", '" + ea[3] + "', '" + ea[4] + "')";

    db.serialize(() => {
        db.run(dbQuery.createTable);
        db.run(dbQuery.insertEntry, (data) => {
            if (data === null) {
                JSONlog.JSONStore(dbQuery.insertEntry);
            } else (
                console.log(data)
            )
        });
    });

    db.close();
}

const formatDateItem = (num) =>{
    if (num < 10) {
        return '0' + num;
    } else {
        return num;
    }
}

module.exports.dbLog = dbLog;
