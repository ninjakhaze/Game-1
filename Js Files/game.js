// VAR DECLARE
var notes;
var mob;
var mob2;
var mob3;
var obj;
var obj2;
var stage;
var bg;
var bg2;
var myObstacles = [];
var laneOnePressed = false;
var laneTwoPressed = false;
var laneThreePressed = false;
var spawnMobs = false;
var beatPressed = false;
var bgmusic;
var score;
var s=0;

// STARTGAME FUNCTION(MAIN FUNCTION)
function startGame() {
        bgmusic = new sound("Assets/Music/[EDGE OF LIFE]-Just Fly Away.wav");
        bgmusic.play();
	obj2  = new component (200,2, "black", 0, 450);
	obj3  = new component (200,1, "black", 0, 515);
	bg    = new component (200, 720,"Assets/Pictures/ChartLayout.png ", 0, 0, "image");
	bg2   = new component2(1020, 720,"Assets/Pictures/stage1_floor_only.png ", 0, 0, "image");
	mob   = new component2(100,100, "blue", 85, 720);
	mob2  = new component2(100,100, "blue", 400, 720);
	mob3  = new component2(100,100, "blue", 700, 720);
	stage = new component2(1020, 279,"Assets/Pictures/stage1stage_only.png ", 0, 0.5, "image");
	obj   = new component3(1020,1, "black", 0, 280);
        score = new component("30px", "Consolas", "white", 80, 595, "text");
        myGameArea.start();
	myGameArea2.start();
}
//LARGE GAME AREA
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1020;
        this.canvas.height = 720;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.interval = setInterval(updateGameArea, 20);
	},
	clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
	stop : function() {
        clearInterval(this.interval);
    }
	
};
//SMALL GAME AREA
var myGameArea2 = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 200;
        this.canvas.height = 720;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.frameNo=0;
		this.interval = setInterval(updateGameArea2, 20);
	},
	clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
	stop : function() {
        clearInterval(this.interval);
    }
};
//  SMALL GAME AREA UNIVERSAL COMPONENT
function component(width, height, color, x, y, type) {
    this.type = type;
	this.width = width;
	this.height = height;
	this.speedX =0;
	this.speedY =0;
	this.x = x;
	this.y = y;
	// IMAGE FUNCTION
	if(type === "image"){
		this.image = new Image();
		this.image.src = color;
	}
	    this.update = function() {
			ctx = myGameArea2.context;
			if (type === "image") 
			{
				ctx.drawImage(this.image, 
				this.x, 
				this.y, 
				this.width, this.height);
			}
                        else if (type ==="text"){
                            ctx.font = this.width + " " + this.height;
                            ctx.fillStyle = color;
                            ctx.fillText(this.text, this.x, this.y);
                        }
			else 
			{
				ctx.fillStyle = color;
				ctx.fillRect(this.x, this.y, this.width, this.height);
			}
		};
	this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) 
		{
           crash = false;
        }
        return crash;
    };
	this.newPos = function(){
		this.x +=this.speedX;
		this.y +=this.speedY;
	};
	
}

// LARGE GAME AREA UNIVERSAL COMPONENT
function component2(width, height, color, x, y, type) {
   this.type = type;
	this.width = width;
	this.height = height;
	this.speedX =0;
	this.speedY =0;
	this.x = x;
	this.y = y;
	// IMAGE FUNCTION
	if(type === "image"){
		this.image = new Image();
		this.image.src = color;
	}
	    this.update = function() {
			ctx = myGameArea.context;
			if (type === "image") 
			{
				ctx.drawImage(this.image, 
				this.x, 
				this.y, 
				this.width, this.height);
			} 
			else 
			{
				ctx.fillStyle = color;
				ctx.fillRect(this.x, this.y, this.width, this.height);
			}
		};
	this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) 
		{
           crash = false;
        }
        return crash;
    };
	this.newPos = function(){
		this.x +=this.speedX;
		this.y +=this.speedY;
	};
	
}

// SIMPLE UNIVERSAL COMPONENT
function component3(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;    
	this.update = function (){    
		ctx = myGameArea.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		
	};
}

window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);

function onKeyDown(event)
{
    switch(event.keyCode)
	{
            case 65: // a - lane one
		if (laneOnePressed === false) 
                    laneOnePressed = true;
                    beatPressed = false;
                    break;
            case 83: // s - lane two
		if (laneTwoPressed === false) 
			laneTwoPressed = true;
			beatPressed = false;					
			break
            case 68: // d - lane three
		if (laneThreePressed === false) 
			laneThreePressed = true;
			beatPressed = false;					
			break
            case 32: // space bar - spawn mobs
		if (spawnMobs === false)
			spawnMobs = true;
			break
	}
    window.onkeydown = null;
}


function onKeyUp(event)
{
    switch(event.keyCode)
	{
            case 65:{ // a - lane one
                laneOnePressed = false;
                beatPressed = false;
                break;
            }
            case 83:{ // s - lane two
                laneTwoPressed = false;
                beatPressed = false;
                break;
            }
            case 68:{ // d - lane three
                laneThreePressed = false;
                beatPressed = false;
                break;
            }
            case 32:{ // space bar - spawn mobs
                spawnMobs = false;
                break;
            }
	}
}

// UPDATE GAMEAREA FUNCTION FOR LARGE CANVAS
function updateGameArea() {
	if (mob.crashWith(obj)|| (mob2.crashWith(obj))||(mob3.crashWith(obj))) {
        myGameArea.stop();
    } 
	else {
		myGameArea.clear();
		bg2.newPos();
		bg2.update();
		mob.y -= 1.5;
		mob.update();
		mob.newPos();
		obj.update();//normal
		mob2.y -= 2;
		mob2.update();
		mob2.newPos();
		obj.update();//fast
		mob3.y -= 0.8;
		mob3.update();
		mob3.newPos();
		obj.update();//heavy
		stage.update();
		if (laneOnePressed === true && beatPressed === true)
			{
                            mob.y = 0;
                            myObstacles.splice(0,1);
                            s=+50;
			}
			else if (laneTwoPressed === true && beatPressed === true)
			{
                            mob2.y = 0;
                            myObstacles.splice(0,1);
                            s=+100;
			}
			else if (laneThreePressed === true && beatPressed === true)
			{
                            mob3.y = 0;
                            myObstacles.splice(0,1);
                            s=+50;
			}
			else if (spawnMobs === true)
			{
                            mob = new component2(100,100, "blue", 85, 720);
                            mob2  = new component2(100,100, "blue", 400, 720);
                            mob3  = new component2(100,100, "blue", 700, 720);
			}
		}
	}
		

// UPDATE GAMEAREA FUNCTION FOR SMALL CANVAS
function updateGameArea2() {
	var w, h;
	if (mob.crashWith(obj)|| (mob2.crashWith(obj))||(mob3.crashWith(obj))) {
        myGameArea.stop();
        bgmusic.stop();
    } 
	else {
        myGameArea2.clear();
	bg.newPos();
	bg.update();
	obj3.newPos();
	obj3.update();
	obj2.update();
        myGameArea2.frameNo += 1;
        if (myGameArea2.frameNo === 1 || everyinterval(40)) {
            w = myGameArea2.canvas.width;
            h = myGameArea2.canvas.height - 200;
            myObstacles.push(new component(50, 15,"Assets/Pictures/red.png ",80,5, "image"));
        }
        for (i = 0; i < myObstacles.length; i++) {
            myObstacles[i].y += 3;
            myObstacles[i].update();
            var beat = myObstacles[i];
            if (obj2.x + obj2.width >= beat.x && obj2.x <= beat.x + beat.y && obj2.y >= beat.y && obj2.y <= beat.y + beat.height)
		{
                    beatPressed = true;
		}
		else if (obj3.x + obj3.width >= beat.x && obj3.x <= beat.x + beat.y && obj3.y >= beat.y && obj3.y <= beat.y + beat.height)
		{
                    myObstacles.shift();
		}
	}
    score.text=" " + s;
    score.update();
}



}
function sound(src){
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("perload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    };
    this.stop = function (){
        this.sound.pause();
    };
}
function everyinterval(n) {
    if ((myGameArea2.frameNo / n) % 1 === 0) {return true;}
    return false;
}