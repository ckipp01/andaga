const blessed = require('blessed'),
      contrib = require('blessed-contrib'),
      totals  = require('./totals');


const createDashboard = () => {
    totals.getTotals((data) => {
        displayDashboard(data);
        // console.log(data);
    })
}

const displayDashboard = (totObj) => {
    const screen = blessed.screen({
        smartCSR: true
    });
  
    let grid = new contrib.grid({rows: 12, cols: 15, screen: screen, hideBorder: true})

    let yearChart = grid.set(1,2, 5, 11, contrib.line, {
        style: {   
            line: 25,
            text: 244,
            baseline: 244
        },
        xLabelPadding: 10,
        xPadding: 3,
        showLegend: false,
        wholeNumbersOnly: false, //true=do not show fraction in y axis
        label: 'ándaga'
    });

    let year2018 = {
        title: '2018',
        x: ['January', 'January'],
        y: [50, 100, 150, 200]
    }

    yearChart.setData([year2018])
       
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