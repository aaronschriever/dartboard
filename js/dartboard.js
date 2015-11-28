var canvas = document.getElementById("dartboard");
var context = canvas.getContext("2d");
var cx = 300;
var cy = 300;
var startDegs = -9;
var endDegs = 9;
var trebleSize = 140;
var doubleSize = 230;
var sectionSize = 240;
var i = 0;
var section_score = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5];
var currentScore=[];
//TODO 
/*
Add array of sections with ID's. May be best to break up either arrays for trebles, doubles etc or array into a section with a double and a triple area.
*/


function toRadians(deg) {
    "use strict";
	return deg * Math.PI / 180;
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
		strokeWidth: 20,
		radius: trebleSize,
		start: startDegs,
		end: endDegs,
		mouseover: function (layer) {
			$(this).animateLayer(layer, {
				strokeStyle: '#ccc'
			}, 500);
			$("selectionID").append(treble_ID);
		},
		mouseout: function (layer) {
			$(this).animateLayer(layer, {
				strokeStyle: strokeColor
			}, 500);
			$("#selectionID").empty();
		},
		click: function (layer) {
			  $("#score").append("score" + section_score[id]*3);
			  }
	});
	
}
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
		strokeWidth: 20,
		radius: doubleSize,
		start: startDegs,
		end: endDegs,
		mouseover: function (layer) {
			$(this).animateLayer(layer, {
				strokeStyle: '#ccc'
			}, 500);
			$("#selectionID").append(double_ID);
			$("#selectionID").append("score" + section_score[id]);
			
		},
		mouseout: function (layer) {
			$(this).animateLayer(layer, {
				strokeStyle: strokeColor
			}, 500);
			$("#selectionID").empty();
		},
		click: function (layer) {
			  $("#score").append("score" + section_score[id]*2);
			  }
			});
}

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
		strokeWidth: 1,
		fillStyle: fillColor,
		radius: sectionSize,
		start: startDegs,
		end: endDegs,
		
		mouseover: function (layer) {
			$(this).animateLayer(layer, {
				fillStyle: 'blue'
			}, 500);
			$("#selectionID").append("<br/>" + section_ID);
			$("#selectionID").append("score" + section_score[id]);
		},
		mouseout: function (layer) {
			$(this).animateLayer(layer, {
				fillStyle: fillColor
			}, 500);
			$("#selectionID").empty();
		},
		click: function (layer) {
			  $("#score").append("score" + section_score[id]);
			  }
	});
	
}

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

function createBullseye() {
	"use strict";
	context.beginPath();
	context.moveTo(cx, cy);
	context.arc(cx, cy, 20, toRadians(0), toRadians(360), false);
	context.closePath();
	context.lineWidth = 1;
	context.fillStyle = 'green';
	context.fill();

	context.beginPath();
	context.moveTo(cx, cy);
	context.arc(cx, cy, 10, toRadians(0), toRadians(360), false);
	context.closePath();
	context.lineWidth = 1;
	context.fillStyle = 'red';
	context.fill();
}
createSegments();

createBullseye();

/*context.beginPath();

context.moveTo(cx,cy);
context.arc(cx, cy, 300, toRadians(261), toRadians(279), false);
context.closePath();
context.lineWidth = 5;
context.fillStyle = 'black';
context.fill();

context.beginPath();

context.moveTo(cx,cy);
context.arc(cx, cy, 300, toRadians(297), toRadians(315), false);
context.closePath();
context.lineWidth = 5;
context.fillStyle = 'black';
context.fill();
*/