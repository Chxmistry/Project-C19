var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var santa, santaImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var merry,merryImg;
var xmassound;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  doorsGroup = new Group();
  climberImg = loadImage("climber.png");
  climberGroup = new Group();
  santaImg = loadImage("Santa.png");
  spookySound = loadSound("spooky.wav");
  invisibleBlockGroup = new Group();
  merryImg = loadImage("Merry.png");
  xmassound = loadSound("Xmasmusic.mp3");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  santa = createSprite(200,200,50,50);
  santa.scale = 0.2;
  santa.addImage("santa",santaImg);
  merry = createSprite(300,200);
  merry.addImage("xmas",merryImg);
  
}

function draw() {
  background(200);

  merry.visible = false;

  if(gameState==="play")
  {

  
  
  if(tower.y > 400){
      tower.y = 300
    }

    if(keyDown("left_arrow"))
    {
      santa.x = santa.x-3;
    }

    if(keyDown("right_arrow"))
    {
      santa.x = santa.x+3;
    }

    if(keyDown("space"))
    {
      santa.velocityY = -5;
    }

    santa.velocityY = santa.velocityY+0.8;

    if(climberGroup.isTouching(santa))
    {
      santa.velocityY = 0;
    }

    if(invisibleBlockGroup.isTouching(santa)||(santa.y>600))
    {
      santa.destroy();
      gameState = "end";
    }

  }
  if (gameState==="end")
  {
    merry.visible = true;
    xmassound.play();
  }

 spawndoor();
drawSprites();
}

function spawndoor() {
  if (frameCount%240===0){
    var door = createSprite(200,-50);
    var climber = createSprite(200,-10);
    climber.addImage(climberImg);
    door.addImage(doorImg);
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    climber.velocityY=1;
    door.velocityY=1;
    door.lifetime = 800;
    climber.lifetime = 800;
    doorsGroup.add(door);
    climberGroup.add(climber);

    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.debug = false;
    invisibleBlockGroup.add(invisibleBlock);

    santa.depth = door.depth;
    santa.depth = santa.depth + 1;
  }
}
