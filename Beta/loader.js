var theLoader = document.getElementById("loading");
var ctxLoader = theLoader.getContext("2d");

ctxLoader.fillStyle = "White";
ctxLoader.fillText("Loading...", theLoader.width/2-25, theLoader.height/2);

//hud.js
var theCanvas2 = document.getElementById("gui");
var ctx2 = theCanvas2.getContext("2d");
var distance = 0;
var score = 0;
var once = false;
var startTime = 0;
var elapsed = 0;
var tmp2 = ctx2.getImageData(0,0,theCanvas2.width,theCanvas2.height);

//menu.js
var theMenu = document.getElementById("menu");
var ctxMenu = theMenu.getContext("2d");
var finished = false;
var difficulty = false;
var instructions = false;

var mos = new Audio();
mos.src = "mos.mp3";
var car = new Audio();
car.src = "car.mp3"

var lambo = new Image();
lambo.src = "LAMBO.png";
var x = 1;

var loadedMenu = false;

//path.js
var storeImageLocation = new Array();
var inMenu = true;

var background = new Audio();
background.src = "background.mp3";
var menumusic = new Audio();
menumusic.src = "menumusic.mp3";

var theCanvas = document.getElementById("myCanvas");
var ctx = theCanvas.getContext("2d");

var thePlayer = document.getElementById("player");
var ctxPlayer = thePlayer.getContext("2d");

var endGame = false;
var houses = new Array();
var mushroom = new Image();
mushroom.src = "mushroom.png";
var thePlayerCarRight = new Image();
thePlayerCarRight.src = "car.png";
var thePlayerCarLeft = new Image();
thePlayerCarLeft.src = "car1.png";
var thePlayerCarUp = new Image();
thePlayerCarUp.src = "car2.png";
var thePlayerCarDown = new Image();
thePlayerCarDown.src = "car3.png";

var success = false;

/*
var theCar = new Array();
theCar[0] = new Image;
theCar[1] = new Image;
theCar[2] = new Image;
theCar[3] = new Image;
theCar[0].src = "car.png";
theCar[1].src = "car3.png";
theCar[2].src = "car1.png";
theCar[3].src = "car2.png";
*/

for(i = 1; i < 4; i++){
	houses[i-1] = new Image();
	houses[i-1].src = "house" + i + ".png";
}
console.log(houses);

document.onreadystatechange = function () {
  if (document.readyState == "complete") {
   theLoader.style.zIndex=-100;
   startMenu();
  }
}