
var storeImageLocation = new Array();
var inMenu = true;

//IUEE
var theCanvas = document.getElementById("myCanvas");
var ctx = theCanvas.getContext("2d");
var endGame = false;
document.addEventListener("keydown", move);

/*
	Grid
*/
ctx.fillStyle = "black";
for(i = theCanvas.width+5; i >= 0; i-=50){
	for(j = theCanvas.height+5; j >= 0; j-=50){
		ctx.fillRect (i, j, 40, 40);
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
var x1 = 50;
var x2;
var y1 = 50;
var y2;
//var endX = 750;
//var endY = 500;
var endX;
var endY;

ctx.fillStyle = "green";
ctx.fillRect(x1-5, y1-5, Math.abs(10), Math.abs(10));


makeRandomEnd(); // I ADDED ////////////////////////////////////////////////////
// As the points increase, the blue dots increase. Added functionality: Cannot go through blue dots.
function bounceEnd()
{
	if(elapsed%2 == 0)
	{
		makeRandomEnd();
	}
}


//ctx.fillStyle = "blue";
//ctx.fillRect(endX-5, endY-5, Math.abs(10), Math.abs(10));
//tmp = ctx.getImageData(0,0,theCanvas.width,theCanvas.height);

function makeRandomEnd() // I ADDED ///////////////////////////////////////
{
	//var colunms = 13;
	//var rows = 17;
	
	endX = (Math.floor(Math.random()*17)*50);//-5;//((Math.floor(Math.random()*13)+1)*50)-5;
	endY = (Math.floor(Math.random()*13)*50);//-5;//((Math.floor(Math.random()*17)+1)*50)-5;
	//if((endX>=600) && (endX<=800) &&(endY>=300) && (endY<=600))
	//{
		ctx.fillStyle = "blue";
		ctx.fillRect(endX-5, endY-5, Math.abs(10), Math.abs(10));
		tmp = ctx.getImageData(0,0,theCanvas.width,theCanvas.height);
	//}
}


 function move(e){
		console.log(e);
		
		switch(e.keyCode){
		case 37: //left arrow
			x1 -=50;
			break;
		case 38: //up arrow
			y1 -= 50;
			break;
		case 39: //right arrow
			x1 +=50;
			break;
		case 40: // down arrow
			y1 +=50;
			break;
		
		}
		ctx.fillStyle = "green";
		ctx.fillRect(x1-5, y1-5, Math.abs(10), Math.abs(10));
		drawPath(x1,y1);
	   
	}





/*	OLD  WAY OF MOVING WITH MOUSE

theCanvas.onmousedown = function (e) {
	if(endGame == false){	
	//Store actual click location
	var mouseX = e.layerX;
	var mouseY = e.layerY;
	
	//Store adjusted click location
	var setX = mouseX;
	var setY = mouseY;
	
	//X Coordinate
	if(Math.abs(mouseX%50-50) <= 25)
		setX = Math.abs(mouseX%50 - 50) + mouseX;
	
	if(Math.abs(mouseX%50) < 25)
		setX = Math.abs(mouseX%50 - mouseX);
		
	//Y Coordinate
	if(Math.abs(mouseY%50-50) <= 25)
		setY = Math.abs(mouseY%50 - 50) + mouseY;
		
	if(Math.abs(mouseY%50) < 25)
		setY = Math.abs(mouseY%50 - mouseY);
		
	
	console.log("Click!\nX: " + mouseX + "\nY: " + mouseY);
	console.log("Results!\nX: " + setX + "\nY: " + setY);
	

	x2 = setX;
	y2 = setY;
	ctx.fillStyle = "green";
	ctx.fillRect(x2-5, y2-5, Math.abs(10), Math.abs(10));
	drawPath(x2,y2);
	}
}





*/




/*
	Draw Selected Path
*/
function drawPath(x2,y2){
	console.log("Got it!\n(" + x2 + ", "+ y2 +")");
	ctx.fillStyle = "red";
		if(x1 == x2){
			if(y1<y2)
				ctx.fillRect(x1-5, y1, Math.abs(10), Math.abs(y2-y1));
			else
				ctx.fillRect(x1-5, y2, Math.abs(10), Math.abs(y2-y1));
			updateScore();
			tmp = ctx.getImageData(0,0,theCanvas.width,theCanvas.height);
			distance += Math.abs(y2-y1);
			x1 = x2;
			y1 = y2;
		}else if(y1 == y2){
			if(x1<x2)
				ctx.fillRect(x1, y1-5, Math.abs(x2-x1), Math.abs(10));
			else
				ctx.fillRect(x2, y2-5, Math.abs(x2-x1), Math.abs(10));
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
			//ctx.fillText("End message goes here", theCanvas.width/3, theCanvas.height/2);
			
			ctx.fillText("Win! Score:" + score, theCanvas.width/3, theCanvas.height/2);
			alert(" CONGRATULATIONS!!,\n Score: " + score + " points in " + elapsed + " seconds" + "\n CLICK SPACE BAR TO GO TO MENU");
			inMenu = true;
			
			/*window.setTimeout(function(){
				ctx.clearRect(0,0,theCanvas.width,theCanvas.height);
				inMenu = true;
				menuPop();
				theMenu.style.zIndex++;
				theCanvas.style.zIndex--;
			},5000);*/
			
			
			
		}
}

function fillCornersRandomly()
{
	//var i=0;
	//var j=0;
	var colunms = 13;
	var rows = 17;
	// Creating the 2D array

	for(i = 0; i < rows; i++){
		storeImageLocation[i] = new Array();
		for(j = 0; j < colunms; j++){
		storeImageLocation[i][j] = 0;
	}

}
	console.log(storeImageLocation);
	for(i = 0; i< rows; i++)
	{
		for(var j=0; j< colunms; j++)
		{
			if((Math.floor(Math.random()*2)+1) == (Math.floor(Math.random()*2)+1)) // some random sequence
			{
				//print the image
				ctx.fillStyle = "White";
				ctx.fillRect((i*50)-5, (j*50)-5, Math.abs(10), Math.abs(10));
				storeImageLocation[i][j] = 1; // image pop up
				
			}
		}
	}
}

function updateScore(){
	var pointsReached = 0;
	if(x1 != x2){
		pointsReached = Math.abs(x2-x1)/50;
	}else if(y1 != y2){
		pointsReached = Math.abs(y2-y1)/50;
	}else{
		console.log("Watcha doing here?");
	}
	console.log(pointsReached);
	for(i = 0; i < pointsReached; i++){
		if(x1 != x2){
			if(x1 < x2){
				if(storeImageLocation[(x1+50+(i*50))/50][y2/50] == 1){
					score++;
					ctx.fillStyle = "White";
					ctx.fillRect((x1+50+(i*50))-5, y2-5, Math.abs(10), Math.abs(10));
					
					storeImageLocation[(x1+50+(i*50))/50][y2/50] = 0;
					
				}
			}else{
				if(storeImageLocation[(x2+50+(i*50))/50][y2/50] == 1){
					score++;
					ctx.fillStyle = "White";
					ctx.fillRect((x2+50+(i*50))-5, y2-5, Math.abs(10), Math.abs(10));
					
					storeImageLocation[(x2+50+(i*50))/50][y2/50] == 0;
					
				}
			}
		}else if(y1 != y2){
			if(y1 < y2){	
				if(storeImageLocation[x2/50][(y1+50+(i*50))/50] == 1){
					score++;
					ctx.fillStyle = "White";
					ctx.fillRect(x2-5, (y1+50+(i*50))-5, Math.abs(10), Math.abs(10));
					
					storeImageLocation[x2/50][(y1+50+(i*50))/50] == 0;
					
				}
			}else{
				if(storeImageLocation[x2/50][(y2+50+(i*50))/50] == 1){
					score++;
					ctx.fillStyle = "White";
					ctx.fillRect(x2-5, (y2+50+(i*50))-5, Math.abs(10), Math.abs(10));
					
					storeImageLocation[x2/50][(y2+50+(i*50))/50] == 0;
					
				}
			}	
		}else{
			console.log("Watcha doing here?");
		}
	}
	bounceEnd(); // I ADDED
}



