/// STARTGAME FUNCTION(MAIN FUNCTION)
function startGame() 
{
    bgmusic = new sound("Assets/Music/[EDGE OF LIFE]-Just Fly Away.wav");
    bgmusic.play();
    Sound = new sound("Assets/Music/Game Over.mp3");
    obj2  = new component (200,2, "black", 0, 450);
    obj3  = new component (200,1, "black", 0, 515);
    bg    = new component (200, 720,"Assets/Pictures/ChartLayout.png ", 0, 0, "image");
    bg2   = new component2(1020, 720,"Assets/Pictures/stage1_floor_only.png ", 0, 0, "image");
   

    stage = new component2(1020, 279,"Assets/Pictures/stage1stage_only.png ", 0, 0.5, "image");
    obj   = new component3(1020,1, "black", 0, 280);
    score = new component("30px", "Consolas", "white", 80, 595, "text");
    button = new component4(20,20, "red", 970, 690);
    myGameArea.start();
    myGameArea2.start();
};