var interval = setInterval(function(){if(x <= 1000){move();}else{menuPop();car.pause();}}, 20);

function move(){
	if(loadedMenu){
		ctxMenu.clearRect(0,0,theMenu.width, theMenu.height);
		x *= 1.1;
		ctxMenu.drawImage(lambo,-200+x,600-250+50, 400, 250);
		car.play();
	}
}

function startMenu(){
ctxMenu.clearRect(0,0,theMenu.width, theMenu.height);

loadedMenu = true;

theMenu.onmousedown = function (e) {
	//Start	
	if((e.layerX >= 300 && e.layerY >= 200) && (e.layerX <= 500 && e.layerY <= 232) && !difficulty){
		ctxMenu.clearRect(0, 0, theMenu.width, theMenu.height);
		theMenu.style.zIndex=0;
		theCanvas.style.zIndex=1;
		setUp(20,80,100);
		score = 0;
		distance = 0;
		endGame = false;
		inMenu=false;
	}
	
	//Difficulty
	else if((e.layerX >= 300 && e.layerY >= 250) && (e.layerX <= 500 && e.layerY <= 282) && !difficulty){
		ctxMenu.clearRect(0, 0, theMenu.width, theMenu.height);
		difficultyMenu(e);
		difficulty = true;
	}
	
	//Easy
	else if((e.layerX >= 300 && e.layerY >= 200) && (e.layerX <= 500 && e.layerY <= 232) && difficulty){
	console.log("Easy");
		ctxMenu.clearRect(0, 0, theMenu.width, theMenu.height);
		theMenu.style.zIndex=0;
		theCanvas.style.zIndex=1;
		setUp(20,80,100);
		score = 0;
		distance = 0;
		endGame = false;
		inMenu=false;
		difficulty = false;
	}
	
	//Medium
	else if((e.layerX >= 300 && e.layerY >= 250) && (e.layerX <= 500 && e.layerY <= 282) && difficulty){
		console.log("Medium");
		ctxMenu.clearRect(0, 0, theMenu.width, theMenu.height);
		theMenu.style.zIndex=0;
		theCanvas.style.zIndex=1;
		setUp(20,30,50);
		score = 0;
		distance = 0;
		endGame = false;
		inMenu=false;
		difficulty = false;
	}
	
	//Hard
	else if((e.layerX >= 300 && e.layerY >= 300) && (e.layerX <= 500 && e.layerY <= 332) && difficulty){
		console.log("Hard");
		ctxMenu.clearRect(0, 0, theMenu.width, theMenu.height);
		theMenu.style.zIndex=0;
		theCanvas.style.zIndex=1;
		setUp(10,15,25);
		score = 0;
		distance = 0;
		endGame = false;
		inMenu=false;
		difficulty = false;
	}
	
	//Instructions
	else if((e.layerX >= 300 && e.layerY >= 300) && (e.layerX <= 500 && e.layerY <= 332) && !difficulty){
		instructionMenu();
		instructions = true;
	}else if(finished && !difficulty && instructions && (e.layerX >= 500 && e.layerY >= 450) && (e.layerX <= 595 && e.layerY <= 495)){
		menuPop();
		instructions = false;
	}
}

theMenu.onmousemove = function(e){
	//Main Menu
	if(finished && !difficulty && !instructions &&(e.layerX >= 300 && e.layerY >= 200) && (e.layerX <= 500 && e.layerY <= 232 )){
		ctxMenu.fillStyle = "Grey";
		ctxMenu.font = "32px Arial";
		ctxMenu.fillText("Start", 360,227);
		mos.play();
	}else if(finished && !difficulty && !instructions &&(e.layerX >= 300 && e.layerY >= 250) && (e.layerX <= 500 && e.layerY <= 282 )){
		ctxMenu.fillStyle = "Grey";
		ctxMenu.font = "32px Arial";
		ctxMenu.fillText("Difficulty", 330,275);
		mos.play();
	}else if(finished && !difficulty && !instructions &&(e.layerX >= 300 && e.layerY >= 300) && (e.layerX <= 500 && e.layerY <= 332 )){
		ctxMenu.fillStyle = "Grey";
		ctxMenu.font = "32px Arial";
		ctxMenu.fillText("Instructions", 305,327);
		mos.play();
	
	//Difficulty Menu
	}else if(finished && difficulty && !instructions && (e.layerX >= 300 && e.layerY >= 200) && (e.layerX <= 500 && e.layerY <= 232 )){
		ctxMenu.fillStyle = "Grey";
		ctxMenu.font = "32px Arial";
		ctxMenu.fillText("Easy", 365,225);
		mos.play();
	}else if(finished && difficulty && !instructions && (e.layerX >= 300 && e.layerY >= 250) && (e.layerX <= 500 && e.layerY <= 282 )){
		ctxMenu.fillStyle = "Grey";
		ctxMenu.font = "32px Arial";
		ctxMenu.fillText("Medium", 340,277);
		mos.play();
	}else if(finished && difficulty && !instructions && (e.layerX >= 300 && e.layerY >= 300) && (e.layerX <= 500 && e.layerY <= 332 )){
		ctxMenu.fillStyle = "Grey";
		ctxMenu.font = "32px Arial";
		ctxMenu.fillText("Hard", 365,327);
		mos.play();
		
	//Instruction Menu
	}else if(finished && !difficulty && instructions && (e.layerX >= 500 && e.layerY >= 450) && (e.layerX <= 595 && e.layerY <= 495)){
		ctxMenu.fillStyle = "Grey";
		ctxMenu.font = "32px Arial";
		ctxMenu.fillText("Back", 512,482);
		mos.play();
	
	//Refresh	
	}else if (finished && !difficulty && !instructions){
		redraw();
	}else if (finished && difficulty && !instructions){
		difficultyMenu(e);
	}else if (finished && !difficulty && instructions){
		instructionMenu();
	}
}
}

function menuPop(){
	finished = true;
	menumusic.loop=true;
	menumusic.play();

	//BG
	ctxMenu.fillStyle = "Red";
	ctxMenu.fillRect(200,100,400,400);
	ctxMenu.fillStyle = "White";
	ctxMenu.font = "32px Arial";
	ctxMenu.fillText("The Menu", 320,132);
	
	//Start
	ctxMenu.fillStyle = "Green";
	ctxMenu.fillRect(300,200,200,32);
	ctxMenu.fillStyle = "White";
	ctxMenu.font = "32px Arial";
	ctxMenu.fillText("Start", 360,227);
	
	//Difficulty
	ctxMenu.fillStyle = "Green";
	ctxMenu.fillRect(300,250,200,32);
	ctxMenu.fillStyle = "White";
	ctxMenu.font = "32px Arial";
	ctxMenu.fillText("Difficulty", 330,275);
	
	//Instructions
	ctxMenu.fillStyle = "Green";
	ctxMenu.fillRect(300,300,200,32);
	ctxMenu.fillStyle = "White";
	ctxMenu.font = "32px Arial";
	ctxMenu.fillText("Instructions", 305,327);
	clearInterval(interval);
}

function redraw(){
	ctxMenu.fillRect(0,0,theMenu.width, theMenu.height);
	ctxMenu.clearRect(0,0,theMenu.width, theMenu.height);
	menuPop();
}

function difficultyMenu(e){
	//BG
	ctxMenu.fillStyle = "Red";
	ctxMenu.fillRect(200,100,400,400);
	ctxMenu.fillStyle = "White";
	ctxMenu.font = "32px Arial";
	ctxMenu.fillText("Choose your difficulty", 250,132);

	//Easy
	ctxMenu.fillStyle = "Green";
	ctxMenu.fillRect(300,200,200,32);
	ctxMenu.fillStyle = "White";
	ctxMenu.font = "32px Arial";
	ctxMenu.fillText("Easy", 365,225);
	
	//Medium
	ctxMenu.fillStyle = "Green";
	ctxMenu.fillRect(300,250,200,32);
	ctxMenu.fillStyle = "White";
	ctxMenu.font = "32px Arial";
	ctxMenu.fillText("Medium", 340,277);
	
	//Hard
	ctxMenu.fillStyle = "Green";
	ctxMenu.fillRect(300,300,200,32);
	ctxMenu.fillStyle = "White";
	ctxMenu.font = "32px Arial";
	ctxMenu.fillText("Hard", 365,327);		
}

function instructionMenu(){
	//BG
	ctxMenu.fillStyle = "Red";
	ctxMenu.fillRect(200,100,400,400);
	ctxMenu.fillStyle = "White";
	ctxMenu.font = "32px Arial";
	ctxMenu.fillText("Instructions", 310,132);
	
	//Info
	ctxMenu.fillStyle = "White";
	ctxMenu.font = "16px Arial";
	ctxMenu.fillText("First you do this, \nthen you do this.", 215,175);

	//Back
	ctxMenu.fillStyle = "Black";
	ctxMenu.fillRect(500,450,95,45);
	ctxMenu.fillStyle = "White";
	ctxMenu.font = "32px Arial";
	ctxMenu.fillText("Back", 512,482);
}