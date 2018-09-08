const blessed = require('blessed'),
      contrib = require('blessed-contrib'),
      totals = require('./totals');


const createDashboard = () => {
  totals.getTotals((data) => {
    displayDashboard(data);
  })
}

const displayDashboard = (totalsObject) => {
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
  for (type in totalsObject) {
    if (typeof totalsObject[type].monthTotal != 'undefined') {
      for (key in totalsObject[type].monthTotal) {
        if (!monthArray.includes(key)) {
          monthArray.push(key);
        }
        switch (type) {
          case 'learn':
            learnArray.push(totalsObject[type].monthTotal[key]);
            break;
          case 'act':
            actArray.push(totalsObject[type].monthTotal[key]);
            break;
          case 'rest':
            restArray.push(totalsObject[type].monthTotal[key]);
            break;
          case 'social':
            socialArray.push(totalsObject[type].monthTotal[key]);
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

  let stackedBar = grid.set(0,0, 6, 15, contrib.stackedBar, {
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
      {percent: totalsObject.learn.total/totalsObject.total, label: ' -|- ' + totalsObject.learn.total + ' -|-', color: 'red'  }
    ]
  })
  let actDonut = grid.set(7, 3, 3, 3,contrib.donut, {
    label: 'Act',
    radius: 10,
    arcWidth: 4,
    remainColor: 'black',
    yPadding: 2,
    data: [
      {percent: totalsObject.act.total/totalsObject.total, label: ' -|-' + totalsObject.act.total + '-|-', color: 'blue'}
    ]
  },)
  let restDonut = grid.set(7, 6, 3, 3, contrib.donut, {
    label: 'Rest',
    radius: 10,
    arcWidth: 4,
    remainColor: 'black',
    yPadding: 2,
    data: [
      {percent: totalsObject.rest.total/totalsObject.total, label: ' -|-' + totalsObject.rest.total + '-|-', color: 'green'}
    ]
  })
  let socialDonut = grid.set(7, 9, 3, 3, contrib.donut, {
    label: 'Social',
    radius: 10,
    arcWidth: 4,
    remainColor: 'black',
    yPadding: 2,
    data: [
      {percent: totalsObject.social.total/totalsObject.total, label: ' -|-' + totalsObject.social.total + '-|-', color: 'yellow'}
    ]
  })
  let undefinedDonut = grid.set(7, 12, 3, 3, contrib.donut, {
    label: 'Unassigned',
    radius: 10,
    arcWidth: 4,
    remainColor: 'black',
    yPadding: 2,
    data: [
      {percent: totalsObject.unassigned.total/totalsObject.total, label: ' -|-' + totalsObject.unassigned.total + '-|-', color: 25}
    ]
  })


  let table = grid.set(9,0,3,4, contrib.table, {
    keys: true,
    fg: 'white',
    border: 'white',
    selectedFg: 'white',
    selectedBg: 'blue',
    interactive: false,
    label: 'Selected Totals',
    width: '30%',
    height: '30%',
    columnSpacing: 5, //in chars
    columnWidth: [25, 20] /*in chars*/ 
  })

  //allow control the table with the keyboard
  table.focus()

  table.setData({ 
    headers: [
      'Totals Type', 
      'Totals Value'
    ], 
    data: [
      ['Total Recorded Time', totalsObject.learn.total + totalsObject.act.total + totalsObject.rest.total + totalsObject.social.total + totalsObject.unassigned.total + ' Minutes']
    ]
  })

  screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  });

  screen.render();
}

module.exports.createDashboard = createDashboard;
