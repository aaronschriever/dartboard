var canvas = document.getElementById("dartboard");
var context = canvas.getContext("2d");
var cx = 300;
var cy = 300;
var startDegs = -9;
var endDegs = 9;
var trebleSize = 120;
var doubleSize = 220;
var sectionSize = 240;
var blackEdge = 300;
var i = 0;
var f = 0;
var z = 0;
var section_score = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5];
var currentScore = [];
var fadeSpeed = 150;
var sectionWidth = 40;
var sectionName = "";
var doubleName = "";
var trebleName = "";
var resized = false;
var bull25radius = 50;
var bull50Radius = 20;
var fontNumSize = 36;
var resizeDivider = 5;
var oldDimension = 600;
var smallestDimension = 600;
var numberArray = [{"text" : "1", "xCoord" : "385", "yCoord" : "45", "rotationVal" : "17", "group" : 'numbers' },
				   {"text" : "2", "xCoord" : "450", "yCoord" : "520", "rotationVal" : "-35", "group" : 'numbers' },
				   {"text" : "3", "xCoord" : "300", "yCoord" : "565", "rotationVal" : "0", "group" : 'numbers' },
				   {"text" : "4", "xCoord" : "515", "yCoord" : "140", "rotationVal" : "55", "group" : 'numbers' },
				   {"text" : "5", "xCoord" : "215", "yCoord" : "50", "rotationVal" : "-20", "group" : 'numbers' },
				   {"text" : "6", "xCoord" : "565", "yCoord" : "300", "rotationVal" : "90", "group" : 'numbers' },
				   {"text" : "7", "xCoord" : "145", "yCoord" : "515", "rotationVal" : "35", "group" : 'numbers' },
				   {"text" : "8", "xCoord" : "45", "yCoord" : "380", "rotationVal" : "75", "group" : 'numbers' },
				   {"text" : "9", "xCoord" : "80", "yCoord" : "150", "rotationVal" : "-52", "group" : 'numbers' },
				   {"text" : "10", "xCoord" : "550", "yCoord" : "385", "rotationVal" : "-70", "group" : 'numbers' },
				   {"text" : "11", "xCoord" : "35", "yCoord" : "300", "rotationVal" : "-90", "group" : 'numbers' },
				   {"text" : "12", "xCoord" : "140", "yCoord" : "90", "rotationVal" : "-35", "group" : 'numbers' },
				   {"text" : "13", "xCoord" : "550", "yCoord" : "215", "rotationVal" : "69", "group" : 'numbers' },
				   {"text" : "14", "xCoord" : "45", "yCoord" : "215",  "rotationVal" : "-70", "group" : 'numbers' },
				   {"text" : "15", "xCoord" : "510", "yCoord" : "460", "rotationVal" : "-55", "group" : 'numbers' },
				   {"text" : "16", "xCoord" : "85", "yCoord" : "450", "rotationVal" : "55", "group" : 'numbers' },
				   {"text" : "17", "xCoord" : "380", "yCoord" : "555", "rotationVal" : "-18", "group" : 'numbers' },
				   {"text" : "18", "xCoord" : "455", "yCoord" : "85", "rotationVal" : "37", "group" : 'numbers' },
				   {"text" : "19", "xCoord" : "215", "yCoord" : "550", "rotationVal" : "18", "group" : 'numbers' },
				   {"text" : "20", "xCoord" : "300", "yCoord" : "35", "rotationVal" : "0", "group" : 'numbers' }];

	

function toRadians(deg) {
    "use strict";
	return deg * Math.PI / 180;
}

function resetScore() {
	"use strict";
	currentScore = [];
	$('canvas').setLayer('dart1', {
		text: ''
}).setLayer('dart2', {
		text: ''
}).setLayer('dart3', {
		text: ''
}).setLayer('Total', {
		text: ''
}).drawLayers();
	
}
/*
*Make the treble section of the dartboard and add interactivity. 
*/
function addScore(score) {
	"use strict";
	if (currentScore.length < 3) {
		currentScore.push(score);
	}
	if (currentScore[0] != null || '' || undefined){
	$('canvas').setLayer('dart1', {
		fillStyle: '#fff',
		text: currentScore[0]
	}).drawLayers();
	}
	if (currentScore[1] != null || '' || undefined){
	$('canvas').setLayer('dart2', {
		fillStyle: '#fff',
		text: currentScore[1]
	}).drawLayers();
	}
	if (currentScore[2] != null || '' || undefined){
	$('canvas').setLayer('dart3', {
		fillStyle: '#fff',
		text: currentScore[2]
	}).setLayer('Total', {
		fillStyle: '#fff',
		text: currentScore[0] + currentScore[1] + currentScore[2]
	})
		.drawLayers();
		
	}
	$("#total").append(currentScore[0] + currentScore[1] + currentScore[2]);
	
}
function makeTreble(id, treble_ID, trebleSize, strokeColor) {
	"use strict";
	$('canvas').drawArc({
		name: treble_ID,
		data: id,
		layer: true,
		groups: ['trebles'],
		strokeStyle: strokeColor,
		x: cx,
		y: cy,
		strokeWidth: sectionWidth,
		radius: trebleSize,
		start: startDegs,
		end: endDegs,
		click: function (layer) {
			$(this).animateLayer(layer, {
				strokeStyle: '#ccc'
			}, fadeSpeed);
			$(this).animateLayer(layer, {
				strokeStyle: strokeColor
			}, fadeSpeed);
			addScore(section_score[id] * 3);
		}
	});
	
}
/*
*Make the double section of the dartboard and add interactivity. 
*/
function makeDouble(id, double_ID, doubleSize, strokeColor) {
	"use strict";
	$('canvas').drawArc({
		name: double_ID,
		data: id,
		layer: true,
		groups: ['doubles'],
		strokeStyle: strokeColor,
		x: cx,
		y: cy,
		strokeWidth: sectionWidth,
		radius: doubleSize,
		start: startDegs,
		end: endDegs,
		click: function (layer) {
			$(this).animateLayer(layer, {
				strokeStyle: '#ccc'
			}, fadeSpeed);
			$(this).animateLayer(layer, {
				strokeStyle: strokeColor
			}, fadeSpeed);
			
			addScore(section_score[id] * 2);
		}
	});
}
/*
*Make the section section of the dartboard and add interactivity. 
*/
function makeSection(id, section_ID, sectionSize, fillColor) {
	"use strict";
	$('canvas').drawSlice({
		name: section_ID,
		data: id,
		layer: true,
		groups: ['sections'],
		strokeStyle: fillColor,
		x: cx,
		y: cy,
		strokeWidth: 0,
		fillStyle: fillColor,
		radius: sectionSize,
		start: startDegs,
		end: endDegs,
		click: function (layer) {
			$(this).animateLayer(layer, {
				fillStyle: '#ccc'
			}, fadeSpeed);
			$(this).animateLayer(layer, {
				fillStyle: fillColor
			}, fadeSpeed);
		
			addScore(section_score[id]);
		}
	});
	
}
/*
* Create sections and add to dartboard. 
*/

function createSegments() {
	"use strict";
	
	for (i; i < 20; i += 1) {
		if (i % 2 === 0) {
			makeSection(i, 'section' + i, sectionSize, 'black');
			makeDouble(i, 'double' + i, doubleSize, 'red');
			makeTreble(i, 'treble' + i, trebleSize, 'red');
			
		} else {
			makeSection(i, 'section' + i, sectionSize, '#ffffcc');
			makeDouble(i, 'double' + i, doubleSize, 'green');
			makeTreble(i, 'treble' + i, trebleSize, 'green');
			
		}
		startDegs = startDegs + 18;
		endDegs = endDegs + 18;
	}
	i = 0;
}
/*
* Create the bull!
*/
function createDartboardBorder() {
	"use strict";
	$('canvas').drawArc({
        name: 'dbBorder',
		x: cx,
		y: cy,
		radius: blackEdge,
		start: 1,
		end: 360,
		fillStyle: 'black',
		shadowColor: '#000',
		shadowBlur: 10,
		closed: true,
		layer: true,
		groups: ['border'],
		click: function (layer) {
			
			$(this).animateLayer(layer, {
				fillStyle: '#ccc'
			}, fadeSpeed);
			$(this).animateLayer(layer, {
				fillStyle: 'black'
			}, fadeSpeed);
			addScore(0);
		}
	});
}

function createBullseye() {
	"use strict";
	
	$('canvas').drawArc({
		name: 'bullseye25',
		data: '25',
		layer: true,
		groups: ['bull'],
		x: cx,
		y: cy,
		strokeWidth: 2,
		fillStyle: 'green',
		radius: bull25radius,
		start: 1,
		end: 360,
	
		click: function (layer) {
			$(this).animateLayer(layer, {
				fillStyle: '#ccc'
			}, fadeSpeed);
			$(this).animateLayer(layer, {
				fillStyle: 'green'
			}, fadeSpeed);
			addScore(25);
		}
	});
	$('canvas').drawArc({
		name: 'bullseye50',
		data: '50',
		layer: true,
		groups: ['bull'],
		strokeStyle: 'red',
		x: cx,
		y: cy,
		strokeWidth: 1,
		fillStyle: 'red',
		radius: bull50Radius,
		start: 1,
		end: 360,
		click: function (layer) {
			$(this).animateLayer(layer, {
				fillStyle: '#ccc'
			}, fadeSpeed);
			$(this).animateLayer(layer, {
				fillStyle: 'red'
			}, fadeSpeed);
			addScore(50);
		}
	});

}
//Draw numbers around dartboard from JSON array.
function makeText(text, xCoord, yCoord, rotationVal, group) {
	"use strict";
	$('canvas').drawText({
		fontFamily: 'Oswald, sans-serif',
		fillStyle: 'white',
		strokeWidth: 1,
		x: xCoord,
		y: yCoord,
		fontSize: fontNumSize,
		layer: true,
		rotate: rotationVal,
		text: text,
		name: text,
		groups: [group]
	});
}
function writeNumbers() {
	"use strict";
//console.log("writing numbers loop");
    while (f < numberArray.length) {
		makeText(numberArray[f].text, numberArray[f].xCoord, numberArray[f].yCoord, numberArray[f].rotationVal);
		f += 1;
	}
	f = 0;
}
function draw() {
	
	"use strict";
	createDartboardBorder();
	// Stop drawing numbers on first resize. 
	//if (resized === true) {
		writeNumbers();
   // }
	createSegments();
	createBullseye();   
	resizeCanvas();
	$('canvas').drawRect({
		fillStyle: 'black',
		x: canvas.width - 100, y: 250,
		width: 100,
		height: 50,
		cornerRadius: 10,
		layer: true,
		groups: ['reset'],
		click: function (layer) {
			$(this).animateLayer(layer, {
				fillStyle: '#ccc'
			}, fadeSpeed);
			$(this).animateLayer(layer, {
				fillStyle: 'black'
			}, fadeSpeed);
			resetScore();
		}
});
	
	makeText('reset', canvas.width - 100, 250, 0, 'reset');
	$('canvas').drawRect({
		fillStyle: 'black',
		x: canvas.width - 100,
		y: 120,
		width: 100,
		height: 200,
		cornerRadius: 10,
		layer: true,
		groups: ['score']});
	makeText('dart1', canvas.width - 100, 60, 0, 'score');
	makeText('dart2', canvas.width - 100, 100, 0, 'score');
	makeText('dart3', canvas.width - 100, 140, 0, 'score');
	makeText('Total', canvas.width - 100, 180, 0, 'score');
}
function resizeCanvas() {
    //resize the dartboard on the canvas to match the viewport size.    
	"use strict";
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
    if (window.innerHeight > window.innerWidth) {
        smallestDimension = window.innerWidth;
    } else {
        smallestDimension = window.innerHeight;
    }
	resizeDivider =  smallestDimension / oldDimension;
    $('canvas').setLayer('zoom', {
		scale: resizeDivider
	}).restoreCanvas({layer: true}).drawLayers();
	if (canvas.height > canvas.width && (canvas.height > 400))
	{
		$('canvas').setLayerGroup('reset',{x: 100, y: canvas.height - 50}).setLayerGroup('score',{x: 100, y: canvas.height - 180});
		$('canvas').setLayer('dart1',{x:  100, y: canvas.height - 240});
		$('canvas').setLayer('dart2',{x:  100, y: canvas.height - 200});
		$('canvas').setLayer('dart3',{x:  100, y: canvas.height - 160});
		$('canvas').setLayer('Total',{x:  100, y: canvas.height - 120}).drawLayers();
	}
	else
	{	
	
		$('canvas').setLayerGroup('reset',{x: canvas.width - 100, y:  250});
		$('canvas').setLayerGroup('score',{x: canvas.width - 100, y:  120});
		$('canvas').setLayer('dart1',{x:  canvas.width - 100, y:  60});
		$('canvas').setLayer('dart2',{x:  canvas.width - 100, y: 100});
		$('canvas').setLayer('dart3',{x:  canvas.width - 100, y: 140});
		$('canvas').setLayer('Total',{x:  canvas.width - 100, y:  180}).drawLayers();
	}
}
$('canvas').scaleCanvas({
    layer: true,
    name: "zoom", // give layer a name so we can easily retrieve it later
    x: 0,
	y: 0,
    scale: 1 // set its scale factor to 1 
});
$(document).ready(function () {
	"use strict";
draw();
});

function initialize() {
	"use strict";
	window.addEventListener('resize', resizeCanvas, false);
}




$(window).load(function () {
	"use strict";
});
initialize();

console.log("end of the line");







