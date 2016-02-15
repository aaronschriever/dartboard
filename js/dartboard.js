
/*global $*/
/*global console*/

var canvas = document.getElementById("dartboard");
var context = canvas.getContext("2d");
var cx = 300;
var cy = 300;
var startDegs = -9;
var endDegs = 9;
var trebleSize = 90;
var doubleSize = 220;
var sectionSize = 240;
var blackEdge = 300;
var i = 0;
var f = 0;
var section_score = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5];
var currentScore = [];
var fadeSpeed = 150;
var sectionWidth = 50;
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
var gameScore = 301;
var cumulativeScore =  {score: 0, isDouble: false};
var cumulativeCounter = 1;
var dartTotal = 0;
var dartOutDesc = "";
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

var dartOutArray = [{"scoreTarget": 170, "dartOut": "T20, T20, DB"}, {"scoreTarget": 169, "dartOut": "none"},
				{"scoreTarget": 168, "dartOut": "none"}, {"scoreTarget": 167, "dartOut": "T20, T19, DB"},
				{"scoreTarget": 166, "dartOut": "none"}, {"scoreTarget": 165, "dartOut": "none"},
				{"scoreTarget": 164, "dartOut": "T20, T18, DB"}, {"scoreTarget": 163, "dartOut": "none"},
				{"scoreTarget": 162, "dartOut": "none"}, {"scoreTarget": 161, "dartOut": "T20, T17, DB"},
				{"scoreTarget": 160, "dartOut": "T20, T20, D20"}, {"scoreTarget": 159, "dartOut": "none"},
				{"scoreTarget": 158, "dartOut": "T20, T20, D19"}, {"scoreTarget": 157, "dartOut": "T20, T19, D20"},
				{"scoreTarget": 156, "dartOut": "T20, T20, D18"}, {"scoreTarget": 155, "dartOut": "T20, T15, DB"},
				{"scoreTarget": 154, "dartOut": "T20, T18, D20"}, {"scoreTarget": 153, "dartOut": "T20, T19, D18"},
				{"scoreTarget": 152, "dartOut": "T20, T20, D16"}, {"scoreTarget": 151, "dartOut": "T20, T17, D20"},
				{"scoreTarget": 150, "dartOut": "T20, T18, D18"}, {"scoreTarget": 149, "dartOut": "T20, T19, D16"},
				{"scoreTarget": 148, "dartOut": "T20, T16, D20"}, {"scoreTarget": 147, "dartOut": "T20, T17, D18"},
				{"scoreTarget": 146, "dartOut": "T20, T18, D16"}, {"scoreTarget": 145, "dartOut": "T20, T15, D20"},
				{"scoreTarget": 144, "dartOut": "T20, T20, D12"}, {"scoreTarget": 143, "dartOut": "T20, T17, D16"},
				{"scoreTarget": 142, "dartOut": "T20, T14, D20"}, {"scoreTarget": 141, "dartOut": "T20, T15, D18"},
				{"scoreTarget": 140, "dartOut": "T20, T16, D16"}, {"scoreTarget": 139, "dartOut": "T20, T13, D20"},
				{"scoreTarget": 138, "dartOut": "T20, T14, D18"}, {"scoreTarget": 137, "dartOut": "T17, T18, D16"},
				{"scoreTarget": 136, "dartOut": "T20, T20, D8"}, {"scoreTarget": 135, "dartOut": "T20, T15, D15"},
				{"scoreTarget": 134, "dartOut": "T20, T14, D16"}, {"scoreTarget": 133, "dartOut": "T20, T19, D8"},
				{"scoreTarget": 132, "dartOut": "T20, T20, D6"}, {"scoreTarget": 131, "dartOut": "T20, T13, D16"},
				{"scoreTarget": 130, "dartOut": "T20, T18, D8"}, {"scoreTarget": 129, "dartOut": "T19, T20, D6"},
				{"scoreTarget": 128, "dartOut": "T18, T14, D16"}, {"scoreTarget": 127, "dartOut": "T19, T18, D8"},
				{"scoreTarget": 126, "dartOut": "T19, T19, D6"}, {"scoreTarget": 125, "dartOut": "B, T20, D20"},
				{"scoreTarget": 124, "dartOut": "T20, D16, D16"}, {"scoreTarget": 123, "dartOut": "T19, T16, D9"},
				{"scoreTarget": 122, "dartOut": "T18, T20, D4"}, {"scoreTarget": 121, "dartOut": "T20, T15, D8"},
				{"scoreTarget": 120, "dartOut": "T20, 20, D20"}, {"scoreTarget": 119, "dartOut": "T19, T10, D16"},
				{"scoreTarget": 118, "dartOut": "T20, 18, D20"}, {"scoreTarget": 117, "dartOut": "T20, 17, D20"},
				{"scoreTarget": 116, "dartOut": "T20, 16, D20"}, {"scoreTarget": 115, "dartOut": "T20, 15, D8"},
				{"scoreTarget": 114, "dartOut": "T20, 14, D20"}, {"scoreTarget": 113, "dartOut": "T20, 13, D8"},
				{"scoreTarget": 112, "dartOut": "T20, 20, D16"}, {"scoreTarget": 111, "dartOut": "T20, 19, D16"},
				{"scoreTarget": 110, "dartOut": "T20, 18, D16"}, {"scoreTarget": 109, "dartOut": "T20, 17, D16"},
				{"scoreTarget": 108, "dartOut": "T20, 16, D16"}, {"scoreTarget": 107, "dartOut": "T19, 18, D16"},
				{"scoreTarget": 106, "dartOut": "T20, 14, D16"}, {"scoreTarget": 105, "dartOut": "T20, 13, D16"},
				{"scoreTarget": 104, "dartOut": "T18, 18, D16"}, {"scoreTarget": 103, "dartOut": "T20, 11, D16"},
				{"scoreTarget": 102, "dartOut": "T20, 10, D16"}, {"scoreTarget": 101, "dartOut": "T17, 18, D16"},
				{"scoreTarget": 100, "dartOut": "T20, D20"}, {"scoreTarget": 99, "dartOut": "T19, 10, D16"},
				{"scoreTarget": 98, "dartOut": "T20, D19"}, {"scoreTarget": 97, "dartOut": "T19, D20"},
				{"scoreTarget": 96, "dartOut": "T20, D18"}, {"scoreTarget": 95, "dartOut": "T15, 18, D16"},
				{"scoreTarget": 94, "dartOut": "T18, D20"}, {"scoreTarget": 93, "dartOut": "T19, D18"},
				{"scoreTarget": 92, "dartOut": "T20, D16"}, {"scoreTarget": 91, "dartOut": "T17, D20"},
				{"scoreTarget": 90, "dartOut": "T18, D18"}, {"scoreTarget": 89, "dartOut": "T19, D16"},
				{"scoreTarget": 88, "dartOut": "T16, D20"}, {"scoreTarget": 87, "dartOut": "T17, D18"},
				{"scoreTarget": 86, "dartOut": "T18, D16"}, {"scoreTarget": 85, "dartOut": "T15, D20"},
				{"scoreTarget": 84, "dartOut": "T20, D12"}, {"scoreTarget": 83, "dartOut": "T17, D16"},
				{"scoreTarget": 82, "dartOut": "T14, D20"}, {"scoreTarget": 81, "dartOut": "T15, D18"},
				{"scoreTarget": 80, "dartOut": "T16, D16"}, {"scoreTarget": 79, "dartOut": "T13, D20"},
				{"scoreTarget": 78, "dartOut": "T14, D18"}, {"scoreTarget": 77, "dartOut": "T15, D16"},
				{"scoreTarget": 76, "dartOut": "T20, D8"}, {"scoreTarget": 75, "dartOut": "T15, D15"},
				{"scoreTarget": 74, "dartOut": "T14, D16"}, {"scoreTarget": 73, "dartOut": "T19, D8"},
				{"scoreTarget": 72, "dartOut": "T20, D6"}, {"scoreTarget": 71, "dartOut": "T13, D16"},
				{"scoreTarget": 70, "dartOut": "T18, D8"}, {"scoreTarget": 69, "dartOut": "T19, D6"},
				{"scoreTarget": 68, "dartOut": "T16, D10"}, {"scoreTarget": 67, "dartOut": "T17, D8"},
				{"scoreTarget": 66, "dartOut": "T10, D18"}, {"scoreTarget": 65, "dartOut": "T15, D10"},
				{"scoreTarget": 64, "dartOut": "T16, D16"}, {"scoreTarget": 63, "dartOut": "T13, D12"},
				{"scoreTarget": 62, "dartOut": "T10, D16"}, {"scoreTarget": 61, "dartOut": "T15, D8"},
				{"scoreTarget": 60, "dartOut": "20, D20"}, {"scoreTarget": 59, "dartOut": "19, D20"},
				{"scoreTarget": 58, "dartOut": "18, D20"}, {"scoreTarget": 57, "dartOut": "17, D20"},
				{"scoreTarget": 56, "dartOut": "16, D20"}, {"scoreTarget": 55, "dartOut": "15, D20"},
				{"scoreTarget": 54, "dartOut": "14, D20"}, {"scoreTarget": 53, "dartOut": "13, D20"},
				{"scoreTarget": 52, "dartOut": "12, D20"}, {"scoreTarget": 51, "dartOut": "19, D16"},
				{"scoreTarget": 50, "dartOut": "18, D16"}, {"scoreTarget": 49, "dartOut": "17, D16"},
				{"scoreTarget": 48, "dartOut": "16, D16"}, {"scoreTarget": 47, "dartOut": "17, D16"},
				{"scoreTarget": 46, "dartOut": "14, D16"}, {"scoreTarget": 45, "dartOut": "13, D16"},
				{"scoreTarget": 44, "dartOut": "12, D16"}, {"scoreTarget": 43, "dartOut": "11, D16"},
				{"scoreTarget": 42, "dartOut": "10, D16"}, {"scoreTarget": 41, "dartOut": "9, D16"},
				{"scoreTarget": 40, "dartOut": "D20"}, {"scoreTarget": 39, "dartOut": "7, D16"}];

function toRadians(deg) {
    "use strict";
	return deg * Math.PI / 180;
}
/* function isDartOut(score) {
	 "use strict";
	 return dartOutArray.filter(score)
 }*/
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
	cumulativeScore.score = 0;
	cumulativeScore.isDouble = false;
	cumulativeCounter = 1;

}
function checkScore(score, isDouble) {
	"use strict";
	if (cumulativeCounter <= 3) {
		console.log(cumulativeCounter);
		cumulativeScore.score += score;
		cumulativeScore.isDouble = isDouble;
		if (cumulativeScore.score === gameScore && cumulativeScore.isDouble === true) {
			resetScore();
			$('canvas').setLayer('reset', {
				text: 'WIN!'
			}).drawLayer();
			gameScore = 301;
			
		}
		cumulativeCounter += 1;
	}
	$('canvas').setLayer('cumulative', {
		text: cumulativeScore.score
	}).drawLayer();
}
function calculateGameScore() {
	"use strict";
	if (currentScore[2]) {
		dartTotal = currentScore[0].score + currentScore[1].score + currentScore[2].score;
		
		if (gameScore < dartTotal || gameScore - dartTotal === 1 || (gameScore - dartTotal === 0 && currentScore[2].isDouble === false)) {
			$('canvas').setLayer('reset', {
				text: 'Bust!'
			}).drawLayers();
		} else { gameScore -= dartTotal;
				
			}
		$('canvas').setLayer('game', {
			fillStyle: '#fff',
			text: gameScore
		}).drawLayers();
		checkScore.score = 0;
		cumulativeScore.score = 0;
		cumulativeCounter = 1;
		if (gameScore < 171 && gameScore > 38) {
			while (i < dartOutArray.length) {
				if (gameScore === dartOutArray[i].scoreTarget) {
					$('canvas').setLayer('dartOut', {text: dartOutArray[i].dartOut});
					break;
				}
				i += 1;
			}
			i = 0;
		}
	}
}

function addScore(score, isDouble) {
	"use strict";
	if (currentScore.length < 3) {
		currentScore.push({"score": score, "isDouble" : isDouble});
	}
	if (currentScore[0]) {
		console.log(currentScore);
		$('canvas').setLayer('dart1', {
			fillStyle: '#fff',
			text: currentScore[0].score
		}).setLayer('reset', {
			text: 'Reset'
		});
		
	}
	if (currentScore[1]) {
		$('canvas').setLayer('dart2', {
			fillStyle: '#fff',
			text: currentScore[1].score
		});
	
	}
	if (currentScore[2]) {
		$('canvas').setLayer('dart3', {
			fillStyle: '#fff',
			text: currentScore[2].score
		}).setLayer('Total', {
			fillStyle: '#fff',
			text: currentScore[0].score + currentScore[1].score + currentScore[2].score
		});
			
	}
	
	checkScore(currentScore[currentScore.length - 1].score, currentScore[currentScore.length - 1].isDouble);
	$('canvas').drawLayers();
	

}
/*
*Make the treble section of the dartboard and add interactivity. 
*/
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
			addScore(section_score[id] * 3, false);
			
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
			
			addScore(section_score[id] * 2, true);
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
		
			addScore(section_score[id], false);
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
			addScore(0, false);
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
			addScore(25, false);
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
			addScore(50, true);
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
function alignScores() {
	"use strict";
	if (canvas.height > canvas.width && (canvas.height > 400)) {
		$('canvas').setLayerGroup('reset', {x: 210, y: canvas.height - 295}).setLayerGroup('score', {x: 100, y: canvas.height - 220}).setLayerGroup('add', {x: 210, y: canvas.height - 235}).setLayerGroup('gameScore', { x: 210, y: canvas.height - 145}).setLayerGroup('dartOutDisp', { x: 160, y: canvas.height - 90});
		$('canvas').setLayer('dart1', {x:  100, y: canvas.height - 280});
		$('canvas').setLayer('dart2', {x:  100, y: canvas.height - 240});
		$('canvas').setLayer('dart3', {x:  100, y: canvas.height - 200});
		$('canvas').setLayer('Total', {x:  100, y: canvas.height - 160}).drawLayers();
	} else {
	
		$('canvas').setLayerGroup('reset', {x: canvas.width - 100, y:  45}).setLayerGroup('add', {x: canvas.width - 100, y:  100}).setLayerGroup('gameScore', {x: canvas.width - 100, y:  195}).setLayerGroup('dartOutDisp', { x: canvas.width - 150, y: 250});
		$('canvas').setLayerGroup('score', {x: canvas.width - 210, y:  120});
		$('canvas').setLayer('dart1', {x:  canvas.width - 210, y:  60});
		$('canvas').setLayer('dart2', {x:  canvas.width - 210, y: 100});
		$('canvas').setLayer('dart3', {x:  canvas.width - 210, y: 140});
		$('canvas').setLayer('Total', {x:  canvas.width - 210, y:  180}).drawLayers();
	}
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
	alignScores();
}
function draw() {
	
	"use strict";
	createDartboardBorder();
	writeNumbers();
	createSegments();
	createBullseye();
	resizeCanvas();
	$('canvas').drawRect({
		fillStyle: 'black',
		x: canvas.width - 100,
		y: 45,
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
	$('canvas').drawRect({
		fillStyle: 'black',
		x: canvas.width - 100,
		y: 100,
		width: 100,
		height: 50,
		cornerRadius: 10,
		layer: true,
		groups: ['add'],
		click: function (layer) {
			$(this).animateLayer(layer, {
				fillStyle: '#ccc'
			}, fadeSpeed);
			$(this).animateLayer(layer, {
				fillStyle: 'black'
			}, fadeSpeed);
			calculateGameScore();
			resetScore();
		}
	});
	$('canvas').drawRect({
		fillStyle: 'black',
		x: canvas.width - 100,
		y: 155,
		width: 100,
		height: 50,
		cornerRadius: 10,
		layer: true,
		groups: ['gameScore']
	});
	$('canvas').drawRect({
		fillStyle: 'black',
		x: canvas.width - 150,
		y: 250,
		width: 220,
		height: 50,
		cornerRadius: 10,
		layer: true,
		groups: ['dartOutDisp']
	});
	
	makeText('reset', canvas.width - 100, 45, 0, 'reset');
	makeText('add', canvas.width - 100, 100, 0, 'add');
	makeText('game', canvas.width - 100, 155, 0, 'gameScore');
	makeText('dartOut', canvas.width - 150, 250, 0, 'dartOutDisp');
	$('canvas').drawRect({
		fillStyle: 'black',
		x: canvas.width - 210,
		y: 120,
		width: 100,
		height: 200,
		cornerRadius: 10,
		layer: true,
		groups: ['score']
	});
	makeText('dart1', canvas.width - 210, 60, 0, 'score');
	makeText('dart2', canvas.width - 210, 100, 0, 'score');
	makeText('dart3', canvas.width - 210, 140, 0, 'score');
	makeText('Total', canvas.width - 210, 180, 0, 'score');
	//makeText('cumulative', canvas.width - 200, 220, 0, 'cumulative');
	alignScores();
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








