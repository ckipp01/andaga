const sqlite3   = require('sqlite3').verbose(),
        db      = new sqlite3.Database('gemynd.db');


const getEntries = (amount, number, options) => {

    // let tellQuery;
    
    // if 
              
        //     db.each("SELECT rowid AS id, date, category, time, notes, place FROM gemynd", (err, row) => {
        //         console.log(row.id + " | " + row.date + " | " + row.category + " | " + row.time + " | " + row.notes + " | " + row.place + '\n');
        //     });
            
        // db.close();
        console.log('you hit list');
}

module.exports.getEntries = getEntries;