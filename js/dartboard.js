var canvas = document.getElementById("dartboard");
var context = canvas.getContext("2d");
var cx = 300;
var cy = 300;
var startDegs = 9;
var endDegs = 27;
var trebleSize = 140;
var doubleSize = 230;
var i = 0;


function toRadians(deg) {
    "use strict";
	return deg * Math.PI / 180;
}
/*
function greenSection() {
	"use strict";
}
*/

function createSegments() {
	"use strict";
	/*jshint passfails: false*/
	for (i; i < 10; i += 1) {
	    context.beginPath();

		context.moveTo(cx, cy);
		context.arc(cx, cy, 240, toRadians(startDegs), toRadians(endDegs), false);
		context.closePath();
		context.lineWidth = 1;
		context.fillStyle = 'black';
		context.fill();
			
		context.beginPath();
		context.arc(cx, cy, 230, toRadians(startDegs), toRadians(endDegs), false);
		context.lineWidth = 20;
		context.strokeStyle = 'red';
		context.stroke();
			
		context.beginPath();
		context.arc(cx, cy, 140, toRadians(startDegs), toRadians(endDegs), false);
		context.lineWidth = 20;
		context.strokeStyle = 'red';
		context.stroke();
			
		context.beginPath();
		context.arc(cx, cy, 230, toRadians(startDegs + 18), toRadians(endDegs + 18), false);
		context.lineWidth = 20;
		context.strokeStyle = 'green';
		context.stroke();
			
		context.beginPath();
		context.arc(cx, cy, 140, toRadians(startDegs + 18), toRadians(endDegs + 18), false);
		context.lineWidth = 20;
		context.strokeStyle = 'green';
		context.stroke();
			
		startDegs = startDegs + 36;
		endDegs = endDegs + 36;
			
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