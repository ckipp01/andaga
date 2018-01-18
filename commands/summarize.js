const blessed = require('blessed'),
      contrib = require('blessed-contrib'),
      totals  = require('./totals');


const createDashboard = () => {
    totals.getTotals((data) => {
        displayDashboard(data);
    })
}

const displayDashboard = (totObj) => {
    // Create a screen object.
    const screen = blessed.screen({
        smartCSR: true
    });
  
    let grid = new contrib.grid({rows: 12, cols: 15, screen: screen, hideBorder: true})
  
    let learnDonut = grid.set(4, 0, 4, 3, contrib.donut, {
        label: 'Learn',
        radius: 10,
        arcWidth: 4,
        remainColor: 'black',
        yPadding: 2,
        data: [
            {percent: totObj.learn/totObj.total, label: ' -|- ' + totObj.learn + ' -|-', color: 54  }
        ]
    })
    let actDonut = grid.set(4, 3, 4, 3,contrib.donut, {
        label: 'Act',
        radius: 10,
        arcWidth: 4,
        remainColor: 'black',
        yPadding: 2,
        data: [
            {percent: totObj.act/totObj.total, label: ' -|-' + totObj.act + '-|-', color: 'green'}
        ]
        },)
    let restDonut = grid.set(4, 6, 4, 3, contrib.donut, {
        label: 'Rest',
        radius: 10,
        arcWidth: 4,
        remainColor: 'black',
        yPadding: 2,
        data: [
            {percent: totObj.rest/totObj.total, label: ' -|-' + totObj.rest + '-|-', color: 'red'}
        ]
    })
    let socialDonut = grid.set(4, 9, 4, 3, contrib.donut, {
        label: 'Social',
        radius: 10,
        arcWidth: 4,
        remainColor: 'black',
        yPadding: 2,
        data: [
            {percent: totObj.social/totObj.total, label: ' -|-' + totObj.social + '-|-', color: 'blue'}
        ]
    })
    let undefinedDonut = grid.set(4, 12, 4, 3, contrib.donut, {
        label: 'Unassigned',
        radius: 10,
        arcWidth: 4,
        remainColor: 'black',
        yPadding: 2,
        data: [
            {percent: totObj.unassigned/totObj.total, label: ' -|-' + totObj.unassigned + '-|-', color: 'blue'}
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