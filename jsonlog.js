const fs    = require('fs');

const JSONStore = (entry, js) => {

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

};

module.exports.JSONStore = JSONStore;