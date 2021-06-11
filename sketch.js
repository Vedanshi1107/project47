var player,player_running;
var bgimg;
var ground,groundimg;
var score = 0;
var obstacle1,obstacle2,obstacle3,obstacle4,obstaclesGroup;
var bg,invisibleboundaries2,invisibleboundaries1;


function preload(){
  player_running = loadAnimation("runner1.png","runner2.png");
  bgimg = loadImage("0.png");


  obstacle1 = loadImage("OBSTACLE1.png");
  obstacle2 = loadImage("OBSTACLE2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("TRASHCAN1.png");




}

function setup(){
  createCanvas(displayWidth,displayHeight);
  player = createSprite(width-750,displayHeight-50,20,50);
  player.addAnimation("running", player_running);
  player.scale= 0.08;


  bg = createSprite(displayWidth/2,displayHeight/2,1500,1500);
  bg.addImage(bgimg);
  bg.velocityY = 4;
  bg.scale = 2.0;
  console.log(displayWidth+","+displayHeight);
  bg.depth = player.depth;
  player.depth +=1;

  invisibleboundaries1 = createSprite(470 ,200, 20, 1500);
  invisibleboundaries1.visible = false;
  invisibleboundaries2 = createSprite(1060,200, 20, 1500);
  invisibleboundaries2.visible = false;
   
  obstaclesGroup = new Group();
}
function draw(){
  background(180)
 

  player.x = World.mouseX;

  if (bg.y > 400){
    bg.y = bg.height/4;
  }

  player.bounceOff(invisibleboundaries1);
  player.bounceOff(invisibleboundaries2);

  spawnObstacles();
  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    //var obstacle = createSprite(600,height-95,20,30);
    var obstacle=createSprite(Math.round(random(500,1000)),Math.round(random(500,-100)),10,10)
    //obstacle.y = Math.round(random(1,5));
    obstacle.setCollider('circle',0,0,45)
    // obstacle.debug = true
  
    obstacle.velocityY = (6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    obstacle.depth = player.depth;
    player.depth +=1;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}