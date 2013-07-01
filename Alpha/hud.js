var theCanvas2 = document.getElementById("gui");
var ctx2 = theCanvas2.getContext("2d");
var distance = 0;
var score = 0;
/*
	Timer Code
*/
var once = false;
var startTime = 0;
var elapsed = 0;
var tmp2 = ctx2.getImageData(0,0,theCanvas2.width,theCanvas2.height);
if(!inMenu){
startTime = new Date();
}
setInterval(function(){drawElapsedTime();},20);
function drawElapsedTime(){
	if(!inMenu && !once){
		startTime = new Date();
		once = true;
	}
	if(!inMenu){
		elapsed = parseInt((new Date() - startTime)/1000);
	}
	ctx2.clearRect(0, 0, theCanvas2.width, theCanvas2.height);
	ctx2.fillStyle = "white";
	ctx2.font = "16px Arial";
	ctx2.fillText("Time: " + elapsed + "s", 5,16);
	ctx2.fillText("Distance: " + distance + "m", 5,32);
	ctx2.fillText("Score: " + score , 5,48);
}