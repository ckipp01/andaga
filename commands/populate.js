const sqlite3   = require('sqlite3').verbose(),
        db      = new sqlite3.Database('gemynd.db'),
        fileSystem      = require('fs'),
        backup  = require('./backup');




const getTotals = (totalRecords) => {
    let total;
    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS gemynd (date TEXT, category TEXT, time INT, notes TEXT, place TEXT)', () => {
            db.get('SELECT COUNT(*) FROM gemynd', (err, row) => {
                if (err) {
                    throw err;
                } else {
                    total = row[Object.keys(row)[0]];
                    totalRecords(total);
                }
            });
        });
    })
}

const enterRecords = (obj, callback) => {
    db.serialize(() => {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                db.run(obj[key], (err) => {
                    if (err)
                        throw err;
                });
            }
        }
    })
    callback();
}

const populate = () => {
    backup.duplicate();
    getTotals( (totalRecords) => {
        console.log('\n -|- ándaga logs prior to populate = ' + totalRecords + ' -|-')
        if (fileSystem.existsSync('./gemynd.json')) {
            const jlogs = require('../gemynd.json');
            let jsonLength = (Object.keys(jlogs).length);
            enterRecords(jlogs, () => {
                getTotals( (totalRecords) => {
                    console.log('\n -|- ándaga logs after populate = ' + totalRecords + ' -|-');
                });
            });
        } else {
            console.log('\n -|- ándaga error -|- \n\n gemynd not found');
        }
    });
}

module.exports.populate = populate;