const blessed = require('blessed'),
      contrib = require('blessed-contrib'),
      totals  = require('./totals');








// Create a screen object.
const screen = blessed.screen({
  smartCSR: true
});

screen.title = 'ándaga summary';

// Create a box perfectly centered horizontally and vertically.
let donut = contrib.donut({
	label: 'Act',
	radius: 8,
	arcWidth: 3,
	remainColor: 'black',
	yPadding: 2,
	data: [
	  {percent: 80, label: 'Act', color: 'green'}
	]
  });

// Append our box to the screen.
screen.append(donut);


// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

// Focus our element.
donut.focus();

// Render the screen.
screen.render();