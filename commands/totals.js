const sqlite3   = require('sqlite3').verbose(),
        db      = new sqlite3.Database('gemynd.db'),
        where   = require('./where');



const getTotals = () => {
    const getAllData = 'SELECT * FROM gemynd';
    let options = [];

    where.form(getAllData, options, (e) => {
        executeAndSort(e, (r) => {
            console.log(r);
        })
    });
}

const executeAndSort = (query, callback) => {
    let totalsObject = {
        learn: 0,
        act: 0,
        social: 0,
        rest: 0,
        unassigned: 0,
        total: 0
    }
    db.each(query, (err, row) => {
        switch (row.category) {
            case 'learn':
                totalsObject.learn = totalsObject.learn + row.time;
                totalsObject.total = totalsObject.total + row.time;
                break;
            case 'act':
                totalsObject.act = totalsObject.act + row.time;
                totalsObject.total = totalsObject.total + row.time;
                break;
            case 'social':
                totalsObject.social = totalsObject.social + row.time;
                totalsObject.total = totalsObject.total + row.time;
                break;
            case 'rest':
                totalsObject.rest = totalsObject.rest + row.time;
                totalsObject.total = totalsObject.total + row.time;
                break;
            default:
                totalsObject.unassigned = totalsObject.unassigned + row.time;
                totalsObject.total = totalsObject.total + row.time;
        }
    }, () => {
        callback(totalsObject)
    })
} 

 



module.exports.getTotals = getTotals;
