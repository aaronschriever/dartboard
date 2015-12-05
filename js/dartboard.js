var canvas = document.getElementById("dartboard");
var context = canvas.getContext("2d");
var cx = 300;
var cy = 300;
var startDegs = -9;
var endDegs = 9;
var trebleSize = 120;
var doubleSize = 220;
var sectionSize = 240;
var i = 0;
var section_score = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5];
var currentScore = [];
var fadeSpeed = 300;
var sectionWidth = 40;
//TODO 
/*
Add array of sections with ID's. May be best to break up either arrays for trebles, doubles etc or array into a section with a double and a triple area.
*/

$(document).ready(function(){
	$("#resetButton").mouseover(function() {
		$(this).css("background-color", "#ccc");
	});
	$("#resetButton").mouseleave(function() {
		$(this).css("background-color", "black");
	});
	$("#resetButton").click(function() {
		resetScore();
	});
});
function toRadians(deg) {
    "use strict";
	return deg * Math.PI / 180;
}

function resetScore() {
	currentScore =[];
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
		radius: 40,
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
/*
function drawNumbers() {
	"use strict";
	$('canvas').drawText({
  	fillStyle: '#ccc',
  	strokeStyle: '#fff',
  	strokeWidth: 1,
  	x: 300, y: 30,
  	fontSize: '30pt',
  	fontFamily: 'Oswald',
  	text: '20'
	});
}
*/
createSegments();

createBullseye();
//drawNumbers();



