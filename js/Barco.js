class Barco{

constructor(x,y,w,h,position,barcosanimation){

this.body = Bodies.rectangle(x,y,w,h);

World.add(world,this.body)

this.w = w // w = width
this.h = h // h = height
this.position = position
this.barco_image = loadImage("assets/boat.png");
this.barcoanimacao = barcosanimation
this.barcovelocidade = 0.05

} 

animar(){
  
  this.barcovelocidade+=0.05
}
display() {
    
    var angle = this.body.angle;
    //posi = position
    var posi = this.body.position;
    
    var index = floor(this.barcovelocidade%this.barcoanimacao.length)

    push();
    translate(posi.x, posi.y);
    rotate(this.angle);
    imageMode(CENTER);
    image(this.barcoanimacao[index], 0, 0, this.w, this.h);
    pop();


  
    
  }

  

  remove(index){

  setTimeout(()=>{
  World.remove(world,barcos[index].body) 
  barcos.splice(index,1)
  },2000);// 2000 = 2 segundo (1000 = 1)  
  }
}
