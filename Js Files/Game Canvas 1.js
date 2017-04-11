//LARGE GAME AREA
var myGameArea = 
{
    canvas : document.createElement("canvas"),
    start : function() 
    {
        this.canvas.width = 1020;
        this.canvas.height = 720;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() 
    {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() 
    {
        clearInterval(this.interval);
    }
};


// LARGE GAME AREA UNIVERSAL COMPONENT
function component2(width, height, color, x, y, type) 
{
    this.type = type;
    this.width = width;
    this.height = height;
    this.speedX =0;
    this.speedY =0;
    this.x = x;
    this.y = y;
    // IMAGE FUNCTION
        if(type === "image")
            {
		this.image = new Image();
		this.image.src = color;
            }
    this.update = function() 
        {
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
    this.crashWith = function(otherobj) 
        {
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
    this.newPos = function()
        {
            this.x +=this.speedX;
            this.y +=this.speedY;
	};
	
};

function component4(width, height, color, x, y) 
{
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;    
    this.update = function() 
        {
            ctx = myGameArea.context;
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        };
    this.clicked = function() 
        {
            pause();
        };
};
// SIMPLE UNIVERSAL COMPONENT
function component3(width, height, color, x, y) 
{
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;    
    this.update = function ()
        {    
            ctx = myGameArea.context;
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
	};
};

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
            case 32: // space bar - spawn mobs
            {
                if (spawnMobs === false)
			spawnMobs = true;
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
            case 32:{ // space bar - spawn mobs
                spawnMobs = false;
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
// UPDATE GAMEAREA FUNCTION FOR LARGE CANVAS
function updateGameArea() 
{
    for (i = 0; i < mob.length; i += 1) {
        if ((mob[i].crashWith(obj))|(mob2[i].crashWith(obj)) || (mob3[i].crashWith(obj))) 
			{
				myGameArea.stop();
				myGameArea2.stop();
				bgmusic.stop();
				Sound.play();
			}
        } 
    
            myGameArea.clear();
            bg2.newPos();
            bg2.update();
            button.update();
            //normal
            obj.update();
            stage.update();
			checkInput();
            myGameArea.frameNo += 1;
            if (myGameArea.frameNo === 1 || everyinterval(150)) 
                {
                    w = myGameArea.canvas.width;
                    h = myGameArea.canvas.height - 200;
                    mob.push(new component2(100,100, "blue", 85, 720));
                    mob2.push(new component2(100,100, "blue", 400, 720));
                    mob3.push(new component2(100,100, "blue", 700, 720));
                }
            for (i = 0; i < mob.length; i++) 
                {
                    mob[i].y -= 2;
                    mob[i].update();
                    mob2[i].y -= 0.5;
                    mob2[i].update();
                    mob3[i].y -=1;
                    mob3[i].update();
                }
};
		

// UPDATE GAMEAREA FUNCTION FOR SMALL CANVAS

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
function everyinterval(n) 
{
    if ((myGameArea2.frameNo / n) % 1 === 0) {return true;}
    return false;
};

function pause()
{
    myGameArea.stop();
    myGameArea2.stop();
    bgmusic.stop();
    Sound.stop();
};
function keyDown(e){
    if(e.keyCode === 80)
        pause();
};