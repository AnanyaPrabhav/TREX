var trex, trex_running, trex_collided;

var ground, groundImage, invisibleGround;

var cloud, cloudImage;

var obstacle;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var cloudGroup;
var obstacleGroup;

var gameOver, restart;
var gOImg, restartImg;

var PLAY=1;
var END=2;

var gameState=PLAY;

function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gOImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(400, 400);
  
  trex = createSprite(50, 380, 20, 20);
  
  trex.addAnimation("runningTrex", trex_running);
  trex.addAnimation("trex_collided", trex_collided);
  trex.scale=0.5;
  
  ground = createSprite(200, 380, 400, 10);
  ground.addImage(groundImage);
  ground.x = ground.width/2;
  
  cloudGroup = new Group();
  obstacleGroup = new Group();
  
  invisibleGround = createSprite(200, 385, 400, 10);
  invisibleGround.visible = false;
  
  gameOver = createSprite(200, 175, 60, 10);
  gameOver.addImage(gOImg);
  gameOver.visible=false;
  
  restart = createSprite(200, 225, 10, 10);
  restart.addImage(restartImg);
  restart.visible=false;
}

function draw() {
  background("white");
  
  trex.collide(invisibleGround);  
  
  console.log(trex.y);
  
   if(gameState===PLAY){
     if(trex.y>=356&&keyDown("space")){
      trex.velocityY = -12 ;
      // playSound("jump.mp3");
     } 
      trex.velocityY = trex.velocityY + 0.8;
       
    if (ground.x < 0){
        ground.x = ground.width/2;
      }
       
    spawnClouds();
    spawnObstacles();
       
    if(trex.isTouching(obstacleGroup)){
        gameState=END;
      }
     
     ground.velocityX=-6;
  
     score=score+Math.round(getFrameRate()/30);
    
}else if(gameState===END){
          ground.velocityX=0;
          trex.changeAnimation("trex_collided", trex_collided);
  
          trex.velocityY=0;
  
          obstacleGroup.setVelocityXEach(0);
          cloudGroup.setVelocityXEach(0);
  
          obstacleGroup.setLifetimeEach(-1);
          cloudGroup.setLifetimeEach(-1);
  
          restart.visible=true;
          gameOver.visible=true;
         
          if(mousePressedOver(restart)){
               reset();
             }
        }
  
  drawSprites(); 
  
  textSize(20);
  strokeWeight(2);
  stroke("lime");
  text("Score : "+score, 160, 100);
}

function spawnClouds(){
  if(World.frameCount%60===0){
    var r1=random(200, 300);
    
    cloud = createSprite(400, 200, 10, 10);
    cloud.y= r1;
    cloud.velocityX=-6;
    cloud.lifetime=67;
    cloud.addImage(cloudImage);
    
    cloudGroup.add(cloud);
  }
}

function spawnObstacles(){
  if(World.frameCount%80===0){
    var r2=Math.round(random(1, 6));
    console.log(r2);
    
    obstacle = createSprite(400, 360, 10, 10);
    obstacle.velocityX=-6;
    obstacle.lifetime=67;
    obstacle.scale=0.75;
   // obstacle.addImage();
    
    switch(r2){
        case 1:obstacle.addImage(obstacle1);
        break;
        case 2:obstacle.addImage(obstacle2);
        break;
        case 3:obstacle.addImage(obstacle3);
        break;
        case 4:obstacle.addImage(obstacle4);
        break;
        case 5:obstacle.addImage(obstacle5);
        break;
        case 6:obstacle.addImage(obstacle6);
        break;
        
        default:break;
    }
    
    obstacleGroup.add(obstacle);
  } 
}
  
function reset(){
  gameState=PLAY;
  
  gameOver.visible=false;
  restart.visible=false;
  
  trex.changeAnimation("runningTrex", trex_running);
  
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  
  score=0;
}  
  
  
  
  
  
  
  
  
  