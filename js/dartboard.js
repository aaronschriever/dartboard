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
var numberArray = [{"number" : "1", "xCoord" : "385", "yCoord" : "45", "rotationVal" : "17" },
				   {"number" : "2", "xCoord" : "450", "yCoord" : "520", "rotationVal" : "-35" },
				   {"number" : "3", "xCoord" : "300", "yCoord" : "565", "rotationVal" : "0" },
				   {"number" : "4", "xCoord" : "515", "yCoord" : "140", "rotationVal" : "55" },
				   {"number" : "5", "xCoord" : "215", "yCoord" : "50", "rotationVal" : "-20" },
				   {"number" : "6", "xCoord" : "565", "yCoord" : "300", "rotationVal" : "90" },
				   {"number" : "7", "xCoord" : "145", "yCoord" : "515", "rotationVal" : "35" },
				   {"number" : "8", "xCoord" : "45", "yCoord" : "380", "rotationVal" : "75" },
				   {"number" : "9", "xCoord" : "80", "yCoord" : "150", "rotationVal" : "-52" },
				   {"number" : "10", "xCoord" : "550", "yCoord" : "385", "rotationVal" : "-70" },
				   {"number" : "11", "xCoord" : "35", "yCoord" : "300", "rotationVal" : "-90" },
				   {"number" : "12", "xCoord" : "140", "yCoord" : "90", "rotationVal" : "-35" },
				   {"number" : "13", "xCoord" : "550", "yCoord" : "215", "rotationVal" : "69" },
				   {"number" : "14", "xCoord" : "45", "yCoord" : "215",  "rotationVal" : "-70" },
				   {"number" : "15", "xCoord" : "510", "yCoord" : "460", "rotationVal" : "-55" },
				   {"number" : "16", "xCoord" : "85", "yCoord" : "450", "rotationVal" : "55" },
				   {"number" : "17", "xCoord" : "380", "yCoord" : "555", "rotationVal" : "-18" },
				   {"number" : "18", "xCoord" : "455", "yCoord" : "85", "rotationVal" : "37" },
				   {"number" : "19", "xCoord" : "215", "yCoord" : "550", "rotationVal" : "18" },
				   {"number" : "20", "xCoord" : "300", "yCoord" : "35", "rotationVal" : "0" }];

	

function toRadians(deg) {
    "use strict";
	return deg * Math.PI / 180;
}

function resetScore() {
	"use strict";
	currentScore = [];
	$("#dart1").empty();
	$("#dart2").empty();
	$("#dart3").empty();
	$("#total").empty();
}
/*
*Make the treble section of the dartboard and add interactivity. 
*/
function addScore(score) {
	"use strict";
	if (currentScore.length < 3) {
		currentScore.push(score);
	}
	$("#dart1").empty();
	$("#dart2").empty();
	$("#dart3").empty();
	$("#total").empty();
	$("#dart1").append(currentScore[0]);
	$("#dart2").append(currentScore[1]);
	$("#dart3").append(currentScore[2]);
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
function makeNumbers(number, xCoord, yCoord, rotationVal) {
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
		text: number,
		name: number
	});
}
function writeNumbers() {
	"use strict";
//console.log("writing numbers loop");
    while (f < numberArray.length) {
		makeNumbers(numberArray[f].number, numberArray[f].xCoord, numberArray[f].yCoord, numberArray[f].rotationVal);
		f += 1;
	}
	f = 0;
}
function redraw() {
	"use strict";
	createDartboardBorder();
	// Stop drawing numbers on first resize. 
	if (resized === true) {
		writeNumbers();
    }
	createSegments();
	createBullseye();
   
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
}
$(document).ready(function () {
	"use strict";
	$("#resetButton").click(function () {
        $(this).animate({ backgroundColor: "#ccc" }, fadeSpeed);
        $(this).animate({ backgroundColor: "black" }, fadeSpeed);
		resetScore();
	});
	$("#resizeButton").click(function () {
        $(this).animate({ backgroundColor: "#ccc" }, fadeSpeed);
        $(this).animate({ backgroundColor: "black" }, fadeSpeed);
		resizeCanvas();
	});
});

function initialize() {
	"use strict";
	window.addEventListener('resize', resizeCanvas, false);
}

initialize();
$('canvas').scaleCanvas({
    layer: true,
    name: "zoom", // give layer a name so we can easily retrieve it later
    x: 0,
	y: 0,
    scale: 1 // set its scale factor to 1 
}).mouseout(function () {
	"use strict";
	$('#canvasSize').empty();
	$('#canvasSize').append("<p>" + canvas.width + "</p>");
});

$(window).load(function () {
	"use strict";
	if (resized === false) {
		writeNumbers();
		resized = true;
	}
	redraw();
});








