var notes =[];
var mob = [];
var mob2 = [];
var mob3 = [];
var obj;
var obj3;
var laneOnePressed = false;
var laneTwoPressed = false;
var laneThreePressed = false;
var beatPressed = false;
function startGame() 
{
    //Notes = new component(50, 15, "Assets/Pictures/red.png" , 75, 5, "image");
    bg    = new component(200, 720,"Assets/Pictures/ChartLayout.png ", 0, 0, "image");
    bg2   = new component(1020, 720,"Assets/Pictures/stage1_floor_only.png ", 200, 0, "image");
    stage = new component(1020, 279,"Assets/Pictures/stage1stage_only.png ", 200, 0.5, "image");
    bgmusic = new sound("Assets/Music/[EDGE OF LIFE]-Just Fly Away.wav");
    bgmusic.play();
    obj  = new component (200,2, "black", 0, 450);
	obj3  = new component (200,2, "black", 0, 515);
    score = new component("30px", "Consolas", "white", 80, 595, "text");
    myGameArea.start();
}

var myGameArea = 
{
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1220;
        this.canvas.height = 720;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }
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
        if ((mybottom < othertop) ||
               (mytop > otherbottom) ||
               (myright < otherleft) ||
               (myleft > otherright)) {
           crash = false;
        }
        return crash;
    }
}

//CONTROLS
window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);

function onKeyDown(event)
{
    switch(event.keyCode)
	{
            case 65: // a - lane one
            {
                if (laneOnePressed === false) 
                    laneOnePressed = true;
                    beatPressed = false;
                    break;
            };
            case 83: // s - lane two
            {
                if (laneTwoPressed === false) 
			laneTwoPressed = true;
			beatPressed = false;					
			break;
            };  
            case 68: // d - lane three
            {
                if (laneThreePressed === false) 
			laneThreePressed = true;
			beatPressed = false;					
			break;
            };
	}
    window.onkeydown = null;
};

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
	}
};

function checkInput()
{
	   if (laneOnePressed === true && beatPressed === true)
		{
            beatPressed = false;
			mob.splice(0,1);
            notes.splice(0,1);
            s++;
		}
            else if (laneTwoPressed === true && beatPressed === true)
		{
            beatPressed = false;
			mob2.splice(0,1);
            notes.splice(0,1);
            s++;
		}
            else if (laneThreePressed === true && beatPressed === true)
		{
            beatPressed = false;
			mob3.splice(0,1);
            notes.splice(0,1);
            s++;
		}
}
//END CONTROLS

function updateGameArea() 
{
    for (i = 0; i < mob.length; i += 1) 
    {
        if ((mob[i].crashWith(stage))|(mob2[i].crashWith(stage)) || (mob3[i].crashWith(stage))) 
        { 
            myGameArea.stop();
            bgmusic.stop();
            
        }
    } 
    
    myGameArea.clear();
    bg.newPos();
    bg.update();
    bg2.newPos();
    bg2.update();
    stage.newPos();
    stage.update();
	obj3.newPos();
	obj3.update();
	obj.update();
	checkInput();
    myGameArea.frameNo += 1;
        if (myGameArea.frameNo === 1 || everyinterval(150)) 
           {
                w = myGameArea.canvas.width;
                h = myGameArea.canvas.height - 200;
                mob.push(new component(100,100, "blue", 295, 720));
                mob2.push(new component(100,100, "blue", 610, 720));
                mob3.push(new component(100,100, "blue", 910, 720));
            }
        for (i = 0; i < mob.length; i++) 
           {
                mob[i].y -= 1;
                mob[i].update();
                mob2[i].y -= 1;
                mob2[i].update();
                mob3[i].y -=1;
                mob3[i].update();
            }
                
        if (myGameArea.frameNo === 1 || everyinterval(40)) 
           {
                w = myGameArea.canvas.width;
                h = myGameArea.canvas.height - 200;
                notes.push(new component(50, 15,"Assets/Pictures/red.png ",80,5, "image"));
            }
        for (i = 0; i < notes.length; i++) 
           {
                notes[i].y += 3;
                notes[i].update();
				var beat = notes[i];
					    if (obj.x + obj.width >= beat.x && obj.x <= beat.x + beat.y && obj.y >= beat.y && obj.y <= beat.y + beat.height)
                        {
							
                            beatPressed = true;
                        }
                    else if (obj3.x + obj3.width >= beat.x && obj3.x <= beat.x + beat.y && obj3.y >= beat.y && obj3.y <= beat.y + beat.height)
                        {
                            notes.shift();
                        }
						
            }
         
    score.update();    
    score.text=" " + s;
}

function everyinterval(n) 
{
    if ((myGameArea.frameNo / n) % 1 === 0) {return true;}
    return false;
};

function sound(src)
{
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("perload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function()
        {
            this.sound.play();
        };
    this.stop = function ()
        {
            this.sound.pause();
        };
};
