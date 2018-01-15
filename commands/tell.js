const sqlite3   = require('sqlite3').verbose(),
        db      = new sqlite3.Database('gemynd.db'),
        where   = require('./where');


const getInfo = (options) => {
    let tellQuery = 'SELECT COUNT(time) FROM gemynd';
    where.form(tellQuery, options, (e) => {
        console.log(e);
        db.get(e, (err, row) => {
            if (err) {
                console.log(' -|- ándaga error -|- \n\n' + err);
            } else {
                console.log(row);
            }
        });
                
        db.close();
    });
}


module.exports.getInfo = getInfo;