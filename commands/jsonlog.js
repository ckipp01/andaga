const fs    = require('fs');

const JSONStore = (entry, js) => {

    let jlogs;
    let numEntries;
    if (fs.existsSync('./gemynd.json')) {
        jlogs = require('../gemynd.json');
        oldEntries = Object.keys(jlogs).length;
        numEntries = oldEntries + 1;
        jlogs[numEntries] = entry
    } else {
        jlogs = {1 : entry};
        numEntries = 1;
    }

    fs.writeFile('gemynd.json', JSON.stringify(jlogs), 'utf8', (err) => {
        if (err) throw err;
        console.log('\n-|-|-|-  ándaga remembers  -|-|-|- \n -|-|-  total memories : ' + numEntries + '  -|-|-');
    });

};

module.exports.JSONStore = JSONStore;