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

    let yearChart = grid.set(1,2, 5, 11, contrib.line, {
        style: {   
            line: 50,
            text: 244,
            baseline: 244
        },
        xLabelPadding: 10,
        xPadding: 3,
        showLegend: false,
        wholeNumbersOnly: false, //true=do not show fraction in y axis
        label: 'ándaga'
    });

    let learnX = [];
    let learnY = [];
    let actX = [];
    let actY = [];
    let socialX = [];
    let socailY = [];
    let restX = [];
    let restY = [];
    let unassignedX = [];
    let unassignedY = [];

    for (type in totObj) {
        for (values in totObj[type]) {
            if (values ===  'monthTotal') {
                switch (type) {
                    case 'learn':
                        learnX = Object.keys(totObj[type][values]);
                        learnY = Object.values(totObj[type][values]);
                        break;
                    case 'act':
                        actX = Object.keys(totObj[type][values]);
                        actY = Object.values(totObj[type][values]);
                        break;
                    case 'social':
                        socialX = Object.keys(totObj[type][values]);
                        socialY = Object.values(totObj[type][values]);
                        break;
                    case 'rest':
                        restX = Object.keys(totObj[type][values]);
                        restY = Object.values(totObj[type][values]);
                        break;
                    case 'unassigned':
                        unassignedX = Object.keys(totObj[type][values]);
                        unassignedY = Object.values(totObj[type][values]);
                        break;
                }
            }
        }
    }

    let learnLine = {
        title: 'learn',
        x: learnX,
        y: learnY
    }
    let actLine = {
        title: 'act',
        x: actX,
        y: actY.filter(act => act !== 'Unassigned')
    }
    let socialLine = {
        title: 'social',
        x: socialX,
        y: socialY
    }
    let restLine = {
        title: 'rest',
        x: restX,
        y: restY
    }
    let unassignedLine = {
        title: 'unassigned',
        x: unassignedX,
        y: unassignedY
    }

    // yearChart.setData([learnLine, actLine, socialLine, restLine, unassignedLine])
    console.log(actX);
    console.log(actY);
    // return;
    yearChart.setData([actLine])
       
    let learnDonut = grid.set(5, 0, 3, 3, contrib.donut, {
        label: 'Learn',
        radius: 10,
        arcWidth: 4,
        remainColor: 'black',
        yPadding: 2,
        data: [
            {percent: totObj.learn.total/totObj.total, label: ' -|- ' + totObj.learn.total + ' -|-', color: 25  }
        ]
    })
    let actDonut = grid.set(5, 3, 3, 3,contrib.donut, {
        label: 'Act',
        radius: 10,
        arcWidth: 4,
        remainColor: 'black',
        yPadding: 2,
        data: [
            {percent: totObj.act.total/totObj.total, label: ' -|-' + totObj.act.total + '-|-', color: 244}
        ]
        },)
    let restDonut = grid.set(5, 6, 3, 3, contrib.donut, {
        label: 'Rest',
        radius: 10,
        arcWidth: 4,
        remainColor: 'black',
        yPadding: 2,
        data: [
            {percent: totObj.rest.total/totObj.total, label: ' -|-' + totObj.rest.total + '-|-', color: 25}
        ]
    })
    let socialDonut = grid.set(5, 9, 3, 3, contrib.donut, {
        label: 'Social',
        radius: 10,
        arcWidth: 4,
        remainColor: 'black',
        yPadding: 2,
        data: [
            {percent: totObj.social.total/totObj.total, label: ' -|-' + totObj.social.total + '-|-', color: 244}
        ]
    })
    let undefinedDonut = grid.set(5, 12, 3, 3, contrib.donut, {
        label: 'Unassigned',
        radius: 10,
        arcWidth: 4,
        remainColor: 'black',
        yPadding: 2,
        data: [
            {percent: totObj.unassigned.total/totObj.total, label: ' -|-' + totObj.unassigned.total + '-|-', color: 25}
        ]
    })
  
    // Quit on Escape, q, or Control-C.
    screen.key(['escape', 'q', 'C-c'], function(ch, key) {
        return process.exit(0);
    });
  
    //   Render the screen.
    screen.render();
}

module.exports.createDashboard = createDashboard;