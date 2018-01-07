const sqlite3   = require('sqlite3').verbose(),
        db      = new sqlite3.Database('gemynd.db');


const getInfo = (options) => {

        console.log('you hit tell');
}

module.exports.getInfo = getInfo;