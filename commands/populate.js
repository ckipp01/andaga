const sqlite3   = require('sqlite3').verbose(),
        db      = new sqlite3.Database('gemynd.db'),
        fs      = require('fs');



const populate = () => {

    if (fs.existsSync('./gemynd.json')) {

        const jlogs = require('../gemynd.json');
        let jsonLength = (Object.keys(jlogs).length);
        let oldEntryNumber;

        db.serialize(() => {
            db.run('CREATE TABLE IF NOT EXISTS gemynd (date TEXT, category TEXT, time INT, notes TEXT, place TEXT)');
            db.get('SELECT COUNT(*) FROM gemynd', (err, row) => {
                if (err) {
                    throw err;
                } else {
                    oldEntryNumber = row[Object.keys(row)[0]];
                }
            });


            for (var key in jlogs) {
                if (jlogs.hasOwnProperty(key)) {
                    db.run(jlogs[key], (err) => {
                        if (err)
                            throw err;
                    });
                }
            }
        })
        db.close();
    } else {
        console.log('gemynd not found');
    }
}

module.exports.populate = populate;