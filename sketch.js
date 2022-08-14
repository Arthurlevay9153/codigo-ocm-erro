const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var balls = [];
var barcos = [];
var barcosprites
var barcosjson
var barcosanimation = [];

function preload() {
  backgroundImg = loadImage("assets/background.gif");
  towerImage = loadImage("assets/tower.png");
  barcosjson = loadJSON("assets/boat/boat.json");
  barcosprites = loadImage("assets/boat/boat.png"); //tem assets e boat porque o boat.png esta dentro destas 2 pastas
}

function setup() {
  canvas = createCanvas(1200, 600); // tamanho do jogo
  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);
  angle = 15;

  var options = {
    isStatic: true
  }

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);

  var barcoframes = barcosjson.frames

  for(var i=0;i<barcos.length; i++){

  var pos = barcoframes[i].position //pos = das json
  
  var imagem = barcosprites.get(pos.x,pos.y,pos.w,pos.h)

  barcosanimation.push(imagem)
  }
}

function draw() {
  background("black");

  Engine.update(engine);

  rect(ground.position.x, ground.position.y, width * 2, 1);

  image(backgroundImg, 0, 0, width, height);
  

  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i],i);

    colisao(i); //comando real esta na linha 121
  }

  cannon.display();

  criarbarcos()
}

// trajetoria e criar a bola
function keyPressed() {
  if (keyCode === 32) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

//aparecer a bola do canhao no jogo
function showCannonBalls(ball,index) {
  if (ball) {
    ball.display();

    if (ball.body.position.x>width||ball.body.position.y>=height-10){
    
      //colocar codigo aqui
      World.remove(world,balls[index].body)
   delete balls[index]
    }
  }
}

// comando para a bola ser atirada
function keyReleased() {
  if (keyCode === 32) {
    balls[balls.length - 1].shoot();
  }
}

//comando para criar os barcos
function criarbarcos(){
  if(barcos.length>0){
  
  if(barcos.length<4&&barcos[barcos.length-1].body.position.x<width-300){
    
   var posicoes = [-40,-60,-80,-70] 

   var posicao = random(posicoes)

   var barco = new Barco(width,height-50,170,170,posicao,barcosanimation);
   
   barcos.push(barco);

   
  }  

  for(var i = 0;i<barcos.length;i++){

    Matter.Body.setVelocity(barcos[i].body,{x:-0.9,y:0})

    barcos[i].display()

    barcos[i].animar()
  }

  }

  //comando pra quando nao tiver nenhum barco no jogo
  // irá criar mais 1 barcos
  else{

    var barco = new Barco(width,height-50,170,170,-60,barcosanimation);

    barcos.push(barco)
  }
}

//comado pra deletar a bola e os barcos
function colisao(index){

for(var i=0;i<barcos.length;i++){
  if(balls[index]!==undefined && barcos[i]!==undefined){

  var colision = Matter.SAT.collides(balls[index].body,barcos[i].body)  

  if(colision.collided){

   World.remove(world,balls[index].body)
   delete balls[index]
   barcos[i].remove(i);
  }
  }
}  
}