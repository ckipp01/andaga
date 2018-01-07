const sqlite3   = require('sqlite3').verbose(),
        db      = new sqlite3.Database('gemynd.db');


const formListQuery = (amount, number, options) => {

    const possibleOptions = ['learn', 'act', 'rest', 'social', 'date', 'place'];
    let listQuery = 'SELECT rowid AS id, date, category, time, notes, place FROM gemynd';
    let queryLimit;
    (number) ? queryLimit = 'LIMIT ' + number : queryLimit = false;
    let flags = possibleOptions.filter(e => options[e])
    let whereClause = '';

    if (flags.length > 0)
        i = 0;
        flags.forEach(e => {
            switch (e) {
                case 'learn':
                case 'act':
                case 'rest':
                case 'social':
                    if (i === 0 ) {
                        whereClause = ' WHERE category = ' + '"' + e + '"';

                    } else {                        
                        whereClause = whereClause + ' or category = ' + '"' + e + '"';
                    }
                    i++;
                    break;
                case 'date':
                case 'place':
                    if (i === 0) {
                        whereClause = ' WHERE ' + e + ' = ' + '"' + options[e] + '"';
                    } else {
                        whereClause = whereClause + ' and ' + e + ' = ' + '"' + options[e] + '"';
                    }
                    i++;
                    break;

            }
        });
    
    listQuery = listQuery + whereClause;

    if (amount === 'some') {
        (queryLimit) ? listQuery = listQuery + ' ORDER BY date DESC ' + queryLimit : listQuery = listQuery + ' ORDER BY date DESC LIMIT 10';
        getEntries(listQuery);
    } else if (amount === 'all') {
        getEntries(listQuery + ' ORDER by date DESC');
    } else {
        console.log('\n -|-|-|- ándaga will tell you some or all but no other -|-|-|-')
    }       
}


const getEntries = (query) => {
    db.each(query, (err, row) => {
        console.log('\n'+  row.date + ' -|- ' + row.category + ' -|- ' + row.time + ' -|- ' + row.notes + ' -|- ' + row.place + '\n');
        // console.log(row);
    });
            
    db.close();
}

module.exports.formListQuery = formListQuery;