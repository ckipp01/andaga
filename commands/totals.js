const sqlite3   = require('sqlite3').verbose(),
        db      = new sqlite3.Database('gemynd.db'),
        where   = require('./where');


const getTotals = (callback) => {
    const getAllData = 'SELECT * FROM gemynd';
    executeAndSort(getAllData, (data) => {
        callback(data);
    })
}

const executeAndSort = (query, callback) => {
    let totalsObject = {
        learn: {
            total: 0
        },
        act:  {
            total: 0
        },
        social: {
            total: 0
        },
        rest: {
            total: 0
        },
        unassigned: {
            total: 0
        },
        total: 0
    }
    db.each(query, (err, row) => {
        switch (row.category) {
            case 'learn':
                totalsObject.learn.total = totalsObject.learn.total + row.time;
                totalsObject.total = totalsObject.total + row.time;
                break;
            case 'act':
                totalsObject.act.total = totalsObject.act.total + row.time;
                totalsObject.total = totalsObject.total + row.time;
                break;
            case 'social':
                totalsObject.social.total = totalsObject.social.total + row.time;
                totalsObject.total = totalsObject.total + row.time;
                break;
            case 'rest':
                totalsObject.rest.total = totalsObject.rest.total + row.time;
                totalsObject.total = totalsObject.total + row.time;
                break;
            default:
                totalsObject.unassigned.total = totalsObject.unassigned.total + row.time;
                totalsObject.total = totalsObject.total + row.time;
        }
    }, () => {
        callback(totalsObject)
    })
} 

 



module.exports.getTotals = getTotals;
