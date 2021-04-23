var path, mainCyclist;
var pathImg, mainRacerImg1, mainRacerImg2;
var pinkCG, yellowCG, redCG;
var PA, RA, YA;
var bell;
var gameOver, gameOverImg;
var PC, RC, YC;


var END = 0;
var PLAY = 1;
var gameState = PLAY;

var distance = 0;

var oImg1,oImg2,oImg3;
var obstaclesGroup;



function preload() {
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png", "images/mainPlayer2.png");
  mainRacerImg2 = loadAnimation("images/mainPlayer3.png");
  
  
  
  PA = loadAnimation("pink1.png", "pink2.png");
  RA = loadAnimation("red1.png", "red2.png");
  YA = loadAnimation("yellow1.png", "yellow2.png");
  
  PC=loadAnimation("pink3.png");
  RC=loadAnimation("red3.png");
  YC=loadAnimation("yellow3.png");
  
  bell = loadSound("cBell.mp3");
  
  gameOverImg = loadImage("gameOver.png");
  
  oImg1=loadImage("obstacle1.png");
  oImg2=loadImage("obstacle2.png");
  oImg3=loadImage("obstacle3.png");
}

function setup() {

  createCanvas(500, 300);

  // Moving background
  path = createSprite(100, 150);
  path.addImage(pathImg);
  path.velocityX = -5;

  //creating boy running
  mainCyclist = createSprite(70, 150, 20, 20);
  mainCyclist.addAnimation("SahilRunning", mainRacerImg1);
  mainCyclist.scale = 0.07;
  
  gameOver = createSprite(250,150,10,10);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.8;
  gameOver.visible=false;
  

  pinkCG = new Group();
  redCG = new Group();
  yellowCG = new Group();
  obstaclesGroup = new Group();


}

function draw() {
  background(0);

  drawSprites();

  textSize(20);
  fill(255);
  text("Distance: " + distance, 350, 30);

  if (gameState === PLAY) {

    mainCyclist.y = World.mouseY;

    edges = createEdgeSprites();
    mainCyclist.collide(edges);
    

     if(keyDown("space")){
       bell.play();
       } 
    
     var i = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (i == 1) {
      pinkCyclists();
    } else if (i == 2) {
      redCyclists();
    } else {
      yellowCyclists();
    }
  }
    
    if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",PC);
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",RC);
    }
    
    if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",YC);
    }
    
   createObstacles();
    
    if(obstaclesGroup.isTouching(mainCyclist)){
      gameState=END;
      
    }


    if (path.x < 0) {
      path.x = width / 2;
      distance = distance + Math.round(getFrameRate() / 50);   
    }
    path.velocityX = -(6+2*distance/150);
  
    
       

    
    } else if(gameState===END){
      gameOver.visible=true ;
      text("press up arrow to restart the game", 100,190);
      
      path.velocityX=0;
      mainCyclist.velocityY = 0;
      mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
      
      pinkCG.setVelocityEach(0);
      pinkCG.setLifetimeEach(-1);
      
      redCG.setVelocityEach(0);
      redCG.setLifetimeEach(-1);
      
      yellowCG.setVelocityEach(0);
      yellowCG.setLifetimeEach(-1);
      
      obstaclesGroup.setVelocityXEach(0);
      
     
      
      if(keyDown(UP_ARROW)){
         reset();
         }
      
    }
  
}






function pinkCyclists(){
        player1 =createSprite(530,Math.round(random(50, 250)));
        player1.scale =0.06;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",PA);
        player1.setLifetime=170;
        pinkCG.add(player1);
}

function redCyclists(){
        player2 =createSprite(530,Math.round(random(50, 250)));
        player2.scale =0.06;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",RA);
        player2.setLifetime=170;
        redCG.add(player2);
}

function yellowCyclists(){
        player3 =createSprite(530,Math.round(random(50, 250))); 
        player3.scale =0.06;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",YA);
        player3.setLifetime=170;
        yellowCG.add(player3);
  
}

function reset(){
  gameState=PLAY; 
  gameOver.visible = false;
  
  
  pinkCG.destroyEach();
  redCG.destroyEach();
  yellowCG.destroyEach();
  obstaclesGroup.destroyEach();
  
  distance = 0;
  
  mainCyclist.addAnimation("SahilRunning", mainRacerImg1);
}


function createObstacles(){
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(530,Math.round(random(50, 250)));
    obstacle.velocityX = -(6 + 2*distance/150);
    obstacle.scale=0.1;
    //generate random obstacles
    var c = Math.round(random(1, 3));
    if(c===1){
      obstacle.addImage(oImg1);
    }else if(c===2){
      obstacle.addImage(oImg2);       
    }else{    
      obstacle.addImage(oImg3);  
     }
        
 obstaclesGroup.add(obstacle)       
}
}