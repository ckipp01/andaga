let where = module.exports = {};

where.form = (query, options, callback) => {
    const possibleOptions = ['learn', 'act', 'rest', 'social', 'date', 'place'];
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
        callback(query + whereClause);
};
