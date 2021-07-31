var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var evil1 , evil1Img , evil2 , evil2Img , evil3 , evil3Img ;
var boy_col , boy_colImg ;
var shield , shield_img ;
var i ;
//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("ground2.png");
  boyImg = loadAnimation("boyCycle.gif");
  gameOver = loadAnimation("gameOver.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  evil1Img = loadImage("evil1.png");
  evil2Img = loadImage("evil2.png");
  evil3Img = loadImage("evil3.png");
  shield_img = loadImage("design.png");
  
}

function setup(){
  
  createCanvas(600,300);

  
  // Moving background
  path=createSprite(250,270);
  path.addImage(pathImg);
  path.velocityX = 4;


  road = createSprite(20,520,200,40);

  //creating boy running
  boy = createSprite(500,260,20,20);
  boy.addAnimation("boy_cycle",boyImg);
  //boy.addImage("game_over",gameOver);
  boy.scale=0.20;



  //creating the groups
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();
evil_group=new Group();
shield_g=new Group();


//collider of boy
boy.setCollider("rectangle",0,0,550,520);
boy.debug=false;

}

function draw() {

  if(gameState===PLAY){                
  background("white");
  //boy.y = World.mouseY;
  if(keyDown("space") && boy.y >= 50){
    boy.velocityY=-10;
  }
  boy.velocityY=boy.velocityY+1;


  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.x > 400 ){
    path.x = width/4;
  }
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    create_evil();


    if(keyDown("s")){
      createShield();
    }

    for(i=0;i<cashG.length;i=i+1){
    
      
      if(boy.isTouching(cashG.get(i)))
      {
        treasureCollection=treasureCollection+30;
        cashG.get(i).destroy();
      }
  
      
    }           

    for(var j=0;j<diamondsG.length;j=j+1){
      
      if(boy.isTouching(diamondsG.get(j)))
      {
        diamondsG.get(j).destroy();
        treasureCollection=treasureCollection+80;
      }
    }

    for(var k=0;k<jwelleryG.length;k=k+1){
      
      if(boy.isTouching(jwelleryG.get(k)))
      {
       jwelleryG.get(k).destroy();
      }
  
    }

    for(var l=0;l<swordGroup.length;l=l+1){
      
      if(boy.isTouching(swordGroup.get(l)))
      {
        swordGroup.get(l).destroy();
      }
  
    }

    for(var o=0;o<evil_group.length;o=o+1){

    if(shield_g.isTouching(evil_group.get(o))){

      evil_group.get(o).destroy();
      shield_g.destroyEach();

    }}

      
    
    
    /////////////////////////   game state END   ///////////////////////

      
    

    if(boy.isTouching(evil_group)){
        gameState = END;
        
        path.velocityX=0;
          evil_group.destroyEach();
          cashG.destroyEach();
          diamondsG.destroyEach()
          jwelleryG.destroyEach();
          swordGroup.destroyEach();
          shield_g.destroyEach();

          evil_group.setVelocityXEach(0);
          cashG.setVelocityXEach(0);
          diamondsG.setVelocityXEach(0);
          jwelleryG.setVelocityXEach(0);
          swordGroup.setVelocityXEach(0);
          shield_g.setVelocityXEach(0);
          boy.addAnimation("boy_cycle",gameOver);
          boy.velocityY=0;
          boy.velocityX=0;
          boy.x=300;
          boy.y=150;
          boy.scale=1;
        }
      }
      textSize(20);
      fill("blue");
      text("Treasure: "+ treasureCollection,460,15);
    
      fill("red");
      textSize(20);
      text("press spacebar to jump",30,15);
    
      fill("green")
      text("Press 'S' for SHIELD",250,15)
      

  drawSprites();
 

}


function createCash() {
  if (World.frameCount % 100 === 0) {
  var cash = createSprite(0,Math.round(random(100, 350), 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityX = 3;
  cash.lifetime = 150;
  cashG.add(cash);

  }
}

function createDiamonds() {
  if (World.frameCount % 260 === 0) {
  var diamonds = createSprite(0,Math.round(random(100, 300), 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityX=3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
  


}
}

function createJwellery() {
  if (World.frameCount % 310 ===0) {
  var jwellery = createSprite(0,Math.round(random(100, 350), 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityX = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);

  
}
}

//dhrub meeting has ended sharing a new link pls join that 

function createSword(){
  if (World.frameCount % 430 === 0) {
  var sword = createSprite(0,Math.round(random(100, 350), 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityX = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
 

  }
}

function create_evil(){
if(World.frameCount % 30 === 0){
  var evil1=createSprite(0,Math.round(random(130,260),10,10));
  evil1.velocityX=4;

  //change images of evil
  var rand = Math.round(random(1,3))

  switch(rand){

    case 1:evil1.addImage(evil1Img);
    break; 

    case 2:evil1.addImage(evil2Img);
    break;

    case 3:evil1.addImage(evil3Img);
    break;

    default:
     break;
  }

  evil1.scale = 0.2 ;
  evil1.lifetime = 220;
  evil_group.add(evil1);  

}
}

function createShield(){
    var shield = createSprite(520,260)
    shield.addImage(shield_img);
    shield.scale=0.6;
    shield.y=boy.y;
    shield_g.add(shield);
  
}