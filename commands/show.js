const blessed = require('blessed'),
      contrib = require('blessed-contrib'),
      totals  = require('./totals');


const createDashboard = () => {
    totals.getTotals((data) => {
        displayDashboard(data);
    })
}

const displayDashboard = (totObj) => {
    const screen = blessed.screen({
        smartCSR: true
    });

    let grid = new contrib.grid({rows: 12, cols: 15, screen: screen, hideBorder: true})

    let monthArray      = [];
    let barValueArray   = [];
    let learnArray      = [];
    let actArray        = [];
    let restArray       = [];
    let socialArray     = [];
    for (type in totObj) {
        if (typeof totObj[type].monthTotal != 'undefined') {
            for (key in totObj[type].monthTotal) {
                if (!monthArray.includes(key)) {
                    monthArray.push(key);
                }
                switch (type) {
                    case 'learn':
                        learnArray.push(totObj[type].monthTotal[key]);
                        break;
                    case 'act':
                        actArray.push(totObj[type].monthTotal[key]);
                        break;
                    case 'rest':
                        restArray.push(totObj[type].monthTotal[key]);
                        break;
                    case 'social':
                        socialArray.push(totObj[type].monthTotal[key]);
                        break;
                    default:
                }
            }
        }
    }
    learnArray.forEach((value, index) => { 
        barValueArray[index] = [value];
    })
    actArray.forEach((value, index) => {
        if (barValueArray[index] !== undefined) {
            barValueArray[index].push(value);
        } else {
            barValueArray[index] = [value]
        }
    })
    restArray.forEach((value, index) => {
        if (barValueArray[index] !== undefined) {
            barValueArray[index].push(value);
        } else {
            barValueArray[index] = [value]
        }    })
    socialArray.forEach((value, index) => {
        if (barValueArray[index] !== undefined) {
            barValueArray[index].push(value);
        } else {
            barValueArray[index] = [value]
        }    })

    let stackedBar = grid.set(1,0, 6, 15, contrib.stackedBar, {
        label: 'Monthly Breakdown',
        barWidth: 10,
        barSpacing: 10,
        xOffset: 5,
        height: "100%",
        width: "50%",
        barBgColor: [ 'red', 'blue', 'green', 'yellow' ]
    })
    screen.append(stackedBar)
    stackedBar.setData({
        barCategory: monthArray,
        stackedCategory: ['Learn', 'Act', 'Rest', 'Social'],
        data: barValueArray
       })

    let learnDonut = grid.set(7, 0, 3, 3, contrib.donut, {
        label: 'Learn',
        radius: 10,
        arcWidth: 4,
        remainColor: 'black',
        yPadding: 2,
        data: [
            {percent: totObj.learn.total/totObj.total, label: ' -|- ' + totObj.learn.total + ' -|-', color: 'red'  }
        ]
    })
    let actDonut = grid.set(7, 3, 3, 3,contrib.donut, {
        label: 'Act',
        radius: 10,
        arcWidth: 4,
        remainColor: 'black',
        yPadding: 2,
        data: [
            {percent: totObj.act.total/totObj.total, label: ' -|-' + totObj.act.total + '-|-', color: 'blue'}
        ]
        },)
    let restDonut = grid.set(7, 6, 3, 3, contrib.donut, {
        label: 'Rest',
        radius: 10,
        arcWidth: 4,
        remainColor: 'black',
        yPadding: 2,
        data: [
            {percent: totObj.rest.total/totObj.total, label: ' -|-' + totObj.rest.total + '-|-', color: 'green'}
        ]
    })
    let socialDonut = grid.set(7, 9, 3, 3, contrib.donut, {
        label: 'Social',
        radius: 10,
        arcWidth: 4,
        remainColor: 'black',
        yPadding: 2,
        data: [
            {percent: totObj.social.total/totObj.total, label: ' -|-' + totObj.social.total + '-|-', color: 'yellow'}
        ]
    })
    let undefinedDonut = grid.set(7, 12, 3, 3, contrib.donut, {
        label: 'Unassigned',
        radius: 10,
        arcWidth: 4,
        remainColor: 'black',
        yPadding: 2,
        data: [
            {percent: totObj.unassigned.total/totObj.total, label: ' -|-' + totObj.unassigned.total + '-|-', color: 25}
        ]
    })

    screen.key(['escape', 'q', 'C-c'], function(ch, key) {
        return process.exit(0);
    });

    screen.render();
}

module.exports.createDashboard = createDashboard;
