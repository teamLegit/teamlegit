var storeImageLocation = new Array();
var inMenu = true;

//var roadWidth = 20;
//var imgSize = 80;
//var tileSize = 100;

//IUEE
var theCanvas = document.getElementById("myCanvas");
var ctx = theCanvas.getContext("2d");
var endGame = false;
var houses = new Array();
for(i = 1; i < 4; i++){
	houses[i-1] = new Image();
	houses[i-1].src = "house" + i + ".png";
}
console.log(houses);

function setUp(roadWidth, imgSize, tileSize){
console.log(roadWidth + ", " + imgSize + ", " + tileSize);
theMenu.style.zIndex=0;
theCanvas.style.zIndex=1;

/*
	Grid
*/
ctx.fillStyle = "black";
for(i = theCanvas.width+(roadWidth/2); i >= 0; i-=tileSize){
	for(j = theCanvas.height+(roadWidth/2); j >= 0; j-=tileSize){
		var a = Math.floor(Math.random()*3);
		ctx.drawImage(houses[a],i,j, imgSize, imgSize);
		}
}
fillCornersRandomly();


/*
	Save Canvas
*/  
var tmp = ctx.getImageData(0,0,theCanvas.width,theCanvas.height);

/*
	Mouse Click
*/
var x1 = tileSize;
var x2;
var y1 = tileSize;
var y2;
var endX;
var endY;

ctx.fillStyle = "green";
ctx.fillRect(x1-(roadWidth/2), y1-(roadWidth/2), Math.abs(roadWidth), Math.abs(roadWidth));


makeRandomEnd(); // I ADDED ////////////////////////////////////////////////////
// As the points increase, the blue dots increase. Added functionality: Cannot go through blue dots.
function bounceEnd()
{
	if(elapsed%3 == 0)
	{
		makeRandomEnd();
	}
}

function makeRandomEnd() // I ADDED ///////////////////////////////////////
{
	endX = (Math.floor(Math.random()*(800/tileSize))*tileSize);
	endY = (Math.floor(Math.random()*(600/tileSize))*tileSize);
	ctx.fillStyle = "blue";
	ctx.fillRect(endX-(roadWidth/2), endY-(roadWidth/2), Math.abs(roadWidth), Math.abs(roadWidth));
	tmp = ctx.getImageData(0,0,theCanvas.width,theCanvas.height);
}

theCanvas.onmousedown = function (e) {
	if(endGame == false){	
	//Store actual click location
	var mouseX = e.layerX;
	var mouseY = e.layerY;
	
	//Store adjusted click location
	var setX = mouseX;
	var setY = mouseY;
	
	//X Coordinate
	if(Math.abs(mouseX%tileSize-tileSize) <= tileSize/2)
		setX = Math.abs(mouseX%tileSize - tileSize) + mouseX;
	
	if(Math.abs(mouseX%tileSize) < tileSize/2)
		setX = Math.abs(mouseX%tileSize - mouseX);
		
	//Y Coordinate
	if(Math.abs(mouseY%tileSize-tileSize) <= tileSize/2)
		setY = Math.abs(mouseY%tileSize - tileSize) + mouseY;
		
	if(Math.abs(mouseY%tileSize) < tileSize/2)
		setY = Math.abs(mouseY%tileSize - mouseY);
		
	
	console.log("Click!\nX: " + mouseX + "\nY: " + mouseY);
	console.log("Results!\nX: " + setX + "\nY: " + setY);
	

	x2 = setX;
	y2 = setY;
	ctx.fillStyle = "green";
	ctx.fillRect(x2-(roadWidth/2), y2-(roadWidth/2), Math.abs(roadWidth), Math.abs(roadWidth));
	drawPath(x2,y2);
	}
}

/*
	Draw Selected Path
*/
function drawPath(x2,y2){
	console.log("Got it!\n(" + x2 + ", "+ y2 +")");
	ctx.fillStyle = "red";
		if(x1 == x2){
			if(y1<y2)
				ctx.fillRect(x1-(roadWidth/2), y1, Math.abs(roadWidth), Math.abs(y2-y1));
			else
				ctx.fillRect(x1-(roadWidth/2), y2, Math.abs(roadWidth), Math.abs(y2-y1));
			updateScore();
			tmp = ctx.getImageData(0,0,theCanvas.width,theCanvas.height);
			distance += Math.abs(y2-y1);
			x1 = x2;
			y1 = y2;
		}else if(y1 == y2){
			if(x1<x2)
				ctx.fillRect(x1, y1-(roadWidth/2), Math.abs(x2-x1), Math.abs(roadWidth));
			else
				ctx.fillRect(x2, y2-(roadWidth/2), Math.abs(x2-x1), Math.abs(roadWidth));
			updateScore();
			tmp = ctx.getImageData(0,0,theCanvas.width,theCanvas.height);
			distance += Math.abs(x2-x1);
			x1 = x2;
			y1 = y2;
		}else{
			console.log("Can't do that!");
			ctx.fillStyle = "white";
			ctx.font = "32px Arial";
			ctx.fillText("YOU CANNOT DO THAT!", theCanvas.width/3, theCanvas.height/2);
			window.setTimeout(function(){
				ctx.clearRect(0,0,theCanvas.width,theCanvas.height);
				ctx.putImageData(tmp,0,0);
			},1000);
		}
		if((x1 == x2 || y1 == y2) && (x1 == endX && y1 == endY)){
			updateScore();
			endGame = true;
			
			console.log("Win ");
			ctx.fillStyle = "white";
			ctx.font = "32px Arial";
			inMenu = true;
			once = false;
			alert(" CONGRATULATIONS!!,\n Score: " + score + " points in " + elapsed + " seconds." + "\n PRESS SPACE TO GO TO MENU.");
			
			
			
		}
}

function fillCornersRandomly()
{
	var columns = 800/tileSize + 1;
	var rows = 600/tileSize + 1;

	// Creating the 2D array
	for(i = 0; i < columns; i++){
		storeImageLocation[i] = new Array();
		for(j = 0; j < rows; j++){
		storeImageLocation[i][j] = 0;
	}

}
	console.log(storeImageLocation);
	for(i = 0; i < columns; i++)
	{
		for(var j=0; j< rows; j++)
		{
			if((Math.floor(Math.random()*2)+1) == (Math.floor(Math.random()*2)+1)) // some random sequence
			{
				//print the image
				ctx.fillStyle = "White";
				ctx.fillRect((i*tileSize)-(roadWidth/2), (j*tileSize)-(roadWidth/2), Math.abs(roadWidth), Math.abs(roadWidth));
				storeImageLocation[i][j] = 1; // image pop up
				
			}
		}
	}
}

function updateScore(){
	var pointsReached = 0;
	if(x1 != x2){
		pointsReached = Math.abs(x2-x1)/tileSize;
	}else if(y1 != y2){
		pointsReached = Math.abs(y2-y1)/tileSize;
	}else{
		console.log("Watcha doing here?");
	}
	console.log(pointsReached);
	for(i = 0; i < pointsReached; i++){
		if(x1 != x2){
			if(x1 < x2){
				if(storeImageLocation[(x1+tileSize+(i*tileSize))/tileSize][y2/tileSize] == 1){
					score++;
					ctx.fillStyle = "White";
					ctx.fillRect((x1+tileSize+(i*tileSize))-(roadWidth/2), y2-(roadWidth/2), Math.abs(roadWidth), Math.abs(roadWidth));
					
					storeImageLocation[(x1+tileSize+(i*tileSize))/tileSize][y2/tileSize] = 0;
					
				}
			}else{
				if(storeImageLocation[(x1-tileSize-(i*tileSize))/tileSize][y2/tileSize] == 1){
					score++;
					ctx.fillStyle = "White";
					ctx.fillRect((x1-tileSize-(i*tileSize))-(roadWidth/2), y2-(roadWidth/2), Math.abs(roadWidth), Math.abs(roadWidth));
					
					storeImageLocation[(x1-tileSize-(i*tileSize))/tileSize][y2/tileSize] = 0;
					
				}
			}
		}else if(y1 != y2){
			if(y1 < y2){	
				if(storeImageLocation[x2/tileSize][(y1+tileSize+(i*tileSize))/tileSize] == 1){
					score++;
					ctx.fillStyle = "White";
					ctx.fillRect(x2-(roadWidth/2), (y1+tileSize+(i*tileSize))-(roadWidth/2), Math.abs(roadWidth), Math.abs(roadWidth));
					
					storeImageLocation[x2/tileSize][(y1+tileSize+(i*tileSize))/tileSize] = 0;
					
				}
			}else{
				if(storeImageLocation[x2/tileSize][(y1-tileSize-(i*tileSize))/tileSize] == 1){
					score++;
					ctx.fillStyle = "White";
					ctx.fillRect(x2-(roadWidth/2), (y1-tileSize-(i*tileSize))-(roadWidth/2), Math.abs(roadWidth), Math.abs(roadWidth));
					
					storeImageLocation[x2/tileSize][(y1-tileSize-(i*tileSize))/tileSize] = 0;
					
				}
			}	
		}else{
			console.log("Watcha doing here?");
		}
	}
	bounceEnd(); // I ADDED
}
}

window.onkeyup = function(e) {
	if(e.keyCode == 32 && endGame){
		ctx.clearRect(0,0,theCanvas.width,theCanvas.height);
		menuPop();
		theMenu.style.zIndex=1;
		theCanvas.style.zIndex=0;
	}
}


