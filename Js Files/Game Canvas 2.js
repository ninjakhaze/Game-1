//SMALL GAME AREA
var myGameArea2 = 
{
    canvas : document.createElement("canvas"),
    start : function() 
    {
        this.canvas.width = 200;
        this.canvas.height = 720;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.frameNo=0;
		this.interval = setInterval(updateGameArea2, 20);
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

function component(width, height, color, x, y, type) 
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
            ctx = myGameArea2.context;
		if (type === "image") 
                    {
			ctx.drawImage(this.image, 
			this.x, 
			this.y, 
			this.width, this.height);
                    }
                else if (type ==="text")
                {
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

function updateGameArea2() 
{
    if (mob.crashWith(obj)|| (mob2.crashWith(obj))||(mob3.crashWith(obj))) 
        {
            Sound.play();    
            bgmusic.stop();
            myGameArea.stop();
            return;
        } 
    else 
        {
            myGameArea2.clear();
            bg.newPos();
            bg.update();
            obj3.newPos();
            obj3.update();
            obj2.update();
            myGameArea2.frameNo += 1;
            if (myGameArea2.frameNo === 1 || everyinterval(40)) 
                {
                    w = myGameArea2.canvas.width;
                    h = myGameArea2.canvas.height - 200;
                    notes.push(new component(50, 15,"Assets/Pictures/red.png ",80,5, "image"));
                }
            for (i = 0; i < notes.length; i++) 
                {
                    notes[i].y += 3;
                    notes[i].update();
                    var beat = notes[i];
                    if (obj2.x + obj2.width >= beat.x && obj2.x <= beat.x + beat.y && obj2.y >= beat.y && obj2.y <= beat.y + beat.height)
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
};