var theMenu = document.getElementById("menu");
var ctxMenu = theMenu.getContext("2d");
var finished = false;

ctxMenu.clearRect(0,0,theMenu.width, theMenu.height);

var lambo = new Image();
lambo.src = "LAMBO.png";
var interval = setInterval(function(){if(x <= 1000){move();}else{menuPop()}}, 20);
var x = 1;


function move(){
	ctxMenu.clearRect(0,0,theMenu.width, theMenu.height);
	x *= 1.1;
	ctxMenu.drawImage(lambo,-200+x,600-250+50, 400, 250);
}
function menuPop(){
	finished = true;
	ctxMenu.fillStyle = "Red";
	ctxMenu.fillRect(200,100,400,400);
	ctxMenu.fillStyle = "White";
	ctxMenu.font = "32px Arial";
	ctxMenu.fillText("The Menu", 320,132);
	
	ctxMenu.fillStyle = "Green";
	ctxMenu.fillRect(300,200,200,32);
	ctxMenu.fillStyle = "White";
	ctxMenu.font = "32px Arial";
	ctxMenu.fillText("Start", 360,227);
	
	clearInterval(interval);
}
	
theMenu.onmousedown = function (e) {
		if((e.layerX >= 300 && e.layerY >= 200) && (e.layerX <= 500 && e.layerY <= 232 )){
			ctxMenu.clearRect(0, 0, theMenu.width, theMenu.height);
			theMenu.style.zIndex--;
			theCanvas.style.zIndex++;
			ctx.putImageData(tmp,0,0);
			inMenu=false;
		}
	}

theMenu.onmousemove = function(e){
	if((e.layerX >= 300 && e.layerY >= 200) && (e.layerX <= 500 && e.layerY <= 232 ) && finished){
		ctxMenu.fillStyle = "Grey";
		ctxMenu.font = "32px Arial";
		ctxMenu.fillText("Start", 360,227);
	}else if(finished){
		redraw();
	}
}
	
function redraw(){
	ctxMenu.fillRect(0,0,theMenu.width, theMenu.height);
	ctxMenu.clearRect(0,0,theMenu.width, theMenu.height);
	menuPop();
}