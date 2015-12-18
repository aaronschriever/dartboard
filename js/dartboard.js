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
var section_score = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5];
var currentScore = [];
var fadeSpeed = 300;
var sectionWidth = 40;
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
//TODO 
/*
Add array of sections with ID's. May be best to break up either arrays for trebles, doubles etc or array into a section with a double and a triple area.
*/

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
		mouseover: function (layer) {
			$(this).animateLayer(layer, {
				strokeStyle: '#ccc'
			}, fadeSpeed);
			
		},
		mouseout: function (layer) {
			$(this).animateLayer(layer, {
				strokeStyle: strokeColor
			}, fadeSpeed);
		//	$("#selectionID").empty();
		},
		click: function (layer) {
	
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
		mouseover: function (layer) {
			$(this).animateLayer(layer, {
				strokeStyle: '#ccc'
			}, fadeSpeed);
			
		},
		mouseout: function (layer) {
			$(this).animateLayer(layer, {
				strokeStyle: strokeColor
			}, fadeSpeed);
			
		},
		click: function (layer) {
		
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
		
		mouseover: function (layer) {
			$(this).animateLayer(layer, {
				fillStyle: '#ccc'
			}, fadeSpeed);
		//	drawNumbers();
		
		},
		mouseout: function (layer) {
			$(this).animateLayer(layer, {
				fillStyle: fillColor
			}, fadeSpeed);
			
		},
		click: function (layer) {
		
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
	
}
/*
* Create the bull!
*/
function createDartboardBorder() {
	"use strict";
	$('canvas').drawArc({
		x: cx,
		y: cy,
		radius: 290,
		start: 1,
		end: 360,
		fillStyle: 'black',
		shadowColor: '#000',
		shadowBlur: 10,
		closed: true,
		layer: true,
		mouseover: function (layer) {
			$(this).animateLayer(layer, {
				fillStyle: '#ccc'
			}, fadeSpeed);
			
		},
		mouseout: function (layer) {
			$(this).animateLayer(layer, {
				fillStyle: 'black'
			}, fadeSpeed);
			
		},
		click: function (layer) {
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
		radius: 50,
		start: 1,
		end: 360,
		mouseover: function (layer) {
			$(this).animateLayer(layer, {
				fillStyle: '#ccc'
			}, fadeSpeed);
			
		},
		mouseout: function (layer) {
			$(this).animateLayer(layer, {
				fillStyle: 'green'
			}, fadeSpeed);
			
		},
		click: function (layer) {
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
		radius: 20,
		start: 1,
		end: 360,
		mouseover: function (layer) {
			$(this).animateLayer(layer, {
				fillStyle: '#ccc'
			}, fadeSpeed);
			
		},
		mouseout: function (layer) {
			$(this).animateLayer(layer, {
				fillStyle: 'red'
			}, fadeSpeed);
			
		},
		click: function (layer) {
			addScore(50);
		}
	});

}
function drawNumbers(number, xCoord, yCoord, rotationVal) {
	"use strict";
	$('canvas').drawText({
		fontFamily: 'Oswald, sans-serif',
		fillStyle: 'white',
		strokeWidth: 1,
		x: xCoord,
		y: yCoord,
		fontSize: 36,
		layer: true,
		rotate: rotationVal,
		text: number
	});
}
$(document).ready(function () {
	"use strict";
	$("#resetButton").mouseover(function () {
		$(this).css("background-color", "#ccc");
	});
	$("#resetButton").mouseleave(function () {
		$(this).css("background-color", "black");
	});
	$("#resetButton").click(function () {
		resetScore();
	});

});

createDartboardBorder();
createSegments();
$(window).load(function(){
while (f < numberArray.length)
{
	drawNumbers(numberArray[f].number, numberArray[f].xCoord, numberArray[f].yCoord, numberArray[f].rotationVal);
f++;
}


createBullseye();});





