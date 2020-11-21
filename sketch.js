var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var jump,checkPoint,die;
var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var gameovr;
var restart;
var res;
var highScore = 0;
var game;
var GameEndScore;
var score;
var play=1;
var end=0;
var gameState=play;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  gameovr = loadImage("gameOver2.png");
  restart = loadImage("restart.png");
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  checkPoint = loadSound("checkPoint.mp3");
  die = loadSound("die.mp3");
  jump = loadSound("jump.mp3");
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  game = createSprite(300,100);
  res = createSprite(300,140);
  game.addImage(gameovr);
  res.addImage(restart);
  game.visible = false;
  res.visible = false;
  res.scale = 0.5;
  game.scale = 0.5;
  //console.log("Hello" + 5);
  
  score = 0;
  cloudsGroup= new Group();
  obstaclesGroup= new Group();
}

function draw() {
  
  trex.collide(invisibleGround);
  background(180);
  text("Score: "+ score, 500,50);
  text("High Score: "+ highScore, 500,100)
  if(score % 100 == 0 && score != 0){
    checkPoint.play()
  }
  
  if(gameState===play){
    console.log(frameCount);
    score = score + Math.round(getFrameRate()/60);
      if(obstaclesGroup.isTouching((trex))){
        die.play();
        gameState = end;
      }
      if(keyDown("space")&& trex.y >= 160) {
    trex.velocityY = -13;
        jump.play();
    
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  
  //spawn the clouds
  spawnClouds();
  
  //spawn obstacles on the ground
  spawnObstacles();
  }
  else if(gameState===end){
    
    ground.velocityX = 0;
    trex.velocityY = 0;
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    trex.changeAnimation("collided",trex_collided);
    // game over 
    GameEndScore = score;
    if(GameEndScore >= highScore){
      highScore = GameEndScore
    }
    game.visible = true;
    res.visible = true;
    
    if(mousePressedOver(res) || keyDown("space")){
      gameState = play
      score = 0;
      obstaclesGroup.destroyEach();
      cloudsGroup.destroyEach();
      game.visible = false;
      res.visible = false;
      ground.velocityX = -4;
      trex.changeAnimation("running",trex_running);
    }
 }
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6 -(score/100);

   
    // //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   obstaclesGroup.add(obstacle);
   trex.debug = true;
   obstacle.debug = true;
   trex.setCollider("circle",0,0,50)
 }
}




function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    //console.log(cloud.lifetime)
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud);
  }
  
}