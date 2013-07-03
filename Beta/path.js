//IUEE
function setUp(roadWidth, imgSize, tileSize){
console.log(roadWidth + ", " + imgSize + ", " + tileSize);
theMenu.style.zIndex=-1;
thePlayer.style.zIndex=0;
theCanvas.style.zIndex=1;

menumusic.loop = false;
menumusic.pause();
background.loop = true;
background.play();

/*
	Grid
*/
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
var tmp = ctxPlayer.getImageData(0,0,thePlayer.width,thePlayer.height);
var tmpCanvas = ctx.getImageData(0,0,theCanvas.width,theCanvas.height);

/*
	Mouse Click
*/
var x1 = tileSize;
var x2;
var y1 = tileSize;
var y2;
var endX;
var endY;

ctxPlayer.drawImage(thePlayerCarRight, x1-(roadWidth/2), y1-(roadWidth/2), Math.abs(roadWidth), Math.abs(roadWidth));


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
	ctxPlayer.fillStyle = "blue";
	ctxPlayer.fillRect(endX-(roadWidth/2), endY-(roadWidth/2), Math.abs(roadWidth), Math.abs(roadWidth));
	//tmp = ctxPlayer.getImageData(0,0,thePlayer.width,thePlayer.height);
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
	
	ctxPlayer.putImageData(tmp,0,0);
	x2 = setX;
	y2 = setY;	
	ctxPlayer.fillStyle = "3c3c3c";
	ctxPlayer.fillRect(x1-(roadWidth/2), y1-(roadWidth/2), Math.abs(roadWidth), Math.abs(roadWidth));
	drawPath(x2,y2);
	if(checkCarOrientation() == 0)
	{
		ctxPlayer.drawImage(thePlayerCarRight, x2-(roadWidth/2), y2-(roadWidth/2), Math.abs(roadWidth), Math.abs(roadWidth));
	}
	if(checkCarOrientation() == 1)
	{
		ctxPlayer.drawImage(thePlayerCarDown, x2-(roadWidth/2), y2-(roadWidth/2), Math.abs(roadWidth), Math.abs(roadWidth));
	}
	if(checkCarOrientation() == 2)
	{
		ctxPlayer.drawImage(thePlayerCarLeft, x2-(roadWidth/2), y2-(roadWidth/2), Math.abs(roadWidth), Math.abs(roadWidth));
	}
	if(checkCarOrientation() == 3)
	{
		ctxPlayer.drawImage(thePlayerCarUp, x2-(roadWidth/2), y2-(roadWidth/2), Math.abs(roadWidth), Math.abs(roadWidth));
	}
	if(checkCarOrientation() == 4)
	{
		ctxPlayer.drawImage(thePlayerCarRight, x2-(roadWidth/2), y2-(roadWidth/2), Math.abs(roadWidth), Math.abs(roadWidth));
	}
	if(success){
		x1 = x2;
		y1 = y2;
		success = false;
	}
//No work :( -> 	var whichOne = checkCarOrientation();
//No work :( -> 	ctxPlayer.drawImage(theCar[whichOne], x2-(roadWidth/2), y2-(roadWidth/2), Math.abs(roadWidth), Math.abs(roadWidth));
	}
}

/*
	Draw Selected Path
*/
function drawPath(x2,y2){
	console.log("Got it!\n(" + x2 + ", "+ y2 +")");
	ctx.fillStyle = "red";
		if(x1 == x2){
			//if(y1<y2)
				//ctx.fillRect(x1-(roadWidth/2), y1, Math.abs(roadWidth), Math.abs(y2-y1));
			//else
				//ctx.fillRect(x1-(roadWidth/2), y2, Math.abs(roadWidth), Math.abs(y2-y1));
			updateScore();
			tmp = ctxPlayer.getImageData(0,0,thePlayer.width,thePlayer.height);
			distance += Math.abs(y2-y1);
			success = true;
		}else if(y1 == y2){
			//if(x1<x2)
				//ctx.fillRect(x1, y1-(roadWidth/2), Math.abs(x2-x1), Math.abs(roadWidth));
			//else
				//ctx.fillRect(x2, y2-(roadWidth/2), Math.abs(x2-x1), Math.abs(roadWidth));
			updateScore();
			tmp = ctxPlayer.getImageData(0,0,thePlayer.width,thePlayer.height);
			distance += Math.abs(x2-x1);
			success = true;
		}else{
			console.log("Can't do that!");
			ctx.fillStyle = "white";
			ctx.font = "32px Arial";
			ctx.fillText("YOU CANNOT DO THAT!", theCanvas.width/3, theCanvas.height/2);
			window.setTimeout(function(){
				ctx.clearRect(0,0,theCanvas.width,theCanvas.height);
				ctx.putImageData(tmpCanvas,0,0);
				ctxPlayer.putImageData(tmp,0,0);
			},1000);
		}
		if((x1 == x2 || y1 == y2) && (x2 == endX && y2 == endY)){
			updateScore();
			endGame = true;
			
			console.log("Win ");
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
				//ctxPlayer.fillStyle = "White";
				//ctxPlayer.fillRect((i*tileSize)-(roadWidth/2), (j*tileSize)-(roadWidth/2), Math.abs(roadWidth), Math.abs(roadWidth));
				ctxPlayer.drawImage(mushroom,(i*tileSize)-(roadWidth/2), (j*tileSize)-(roadWidth/2), Math.abs(roadWidth), Math.abs(roadWidth));
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
					ctxPlayer.fillStyle = "3c3c3c";
					ctxPlayer.fillRect((x1+tileSize+(i*tileSize))-(roadWidth/2), y2-(roadWidth/2), Math.abs(roadWidth), Math.abs(roadWidth));
					
					storeImageLocation[(x1+tileSize+(i*tileSize))/tileSize][y2/tileSize] = 0;
					
				}
			}else{
				if(storeImageLocation[(x1-tileSize-(i*tileSize))/tileSize][y2/tileSize] == 1){
					score++;
					ctxPlayer.fillStyle = "3c3c3c";
					ctxPlayer.fillRect((x1-tileSize-(i*tileSize))-(roadWidth/2), y2-(roadWidth/2), Math.abs(roadWidth), Math.abs(roadWidth));
					
					storeImageLocation[(x1-tileSize-(i*tileSize))/tileSize][y2/tileSize] = 0;
					
				}
			}
		}else if(y1 != y2){
			if(y1 < y2){	
				if(storeImageLocation[x2/tileSize][(y1+tileSize+(i*tileSize))/tileSize] == 1){
					score++;
					ctxPlayer.fillStyle = "3c3c3c";
					ctxPlayer.fillRect(x2-(roadWidth/2), (y1+tileSize+(i*tileSize))-(roadWidth/2), Math.abs(roadWidth), Math.abs(roadWidth));
					
					storeImageLocation[x2/tileSize][(y1+tileSize+(i*tileSize))/tileSize] = 0;
					
				}
			}else{
				if(storeImageLocation[x2/tileSize][(y1-tileSize-(i*tileSize))/tileSize] == 1){
					score++;
					ctxPlayer.fillStyle = "3c3c3c";
					ctxPlayer.fillRect(x2-(roadWidth/2), (y1-tileSize-(i*tileSize))-(roadWidth/2), Math.abs(roadWidth), Math.abs(roadWidth));
					
					storeImageLocation[x2/tileSize][(y1-tileSize-(i*tileSize))/tileSize] = 0;
					
				}
			}	
		}else{
			console.log("Watcha doing here?");
		}
	}
	bounceEnd(); // I ADDED
}

function checkCarOrientation(){
	if(x1>x2){
	//facing left
	return 2;
	}
	if(x2>x1){
	//facing right
	return 0;
	}
	if(y1>y2){
	//facing up
	return 3;
	}
	if(y2>y1){
	//facing down
	return 1;
	}
	return 4;
}
}

window.onkeyup = function(e) {
	if(e.keyCode == 32 && endGame){
		ctxPlayer.clearRect(0,0,thePlayer.width,thePlayer.height);
		ctx.clearRect(0,0,theCanvas.width,theCanvas.height);
		menuPop();
		theMenu.style.zIndex=1;
		theCanvas.style.zIndex=0;
	}
}



