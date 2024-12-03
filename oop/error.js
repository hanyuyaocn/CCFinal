let n=100
let particle=[]

function setup() {
  createCanvas(300, 300);
  for(let i=0;i<n;i++){
    particle[i]=new Particle(random(0,20),random(1,50),random(0,6.28),random(0,400))
  }
}

function draw() {
  background(0);
  for(let i=0;i<n;i++){
    particle[i].display();
    particle[i].update();
    for (let j = 0; j < n; j++) {
            if (i != j) {
                particle[i].collision(particle[j]);
            }

        }
  }
  
}
  
class Particle {
  constructor(amplitude,wavenumber,phase,startY){
    this.a=amplitude;
    this.k=wavenumber;
    this.phi=phase,
    this.x=0;
    this.y=startY;
    this.c=[0,map(amplitude,0,10,0,255),map(wavenumber,1,10,0,255)];
    this.xVelocity=random(1,10)
  }
  display(){
    push();
    translate(this.x,this.y);
    noStroke();
    circle(0,0,1);
    pop();
  }
  update(){
    this.x+=random(0,100);
    //this.x+=this.xVelocity;
    this.y=this.a*sin(this.k*this.x+this.phi)+this.y;
    if(this.x>=400||this.x<-10){
      this.x=0;
      this.y=random(0,400)
      this.a=random(0,20);
      this.k=random(1,50);
      this.phi=random(0,2*PI);
      this.c=[0,map(this.a,0,10,0,255),map(this.k,1,10,0,255)];
      fill(this.c);
    }
  }
  collision(other){
    let d=dist(other.x,other.y,this.x,this.y)
    if(d<=10){
      //other.xVelocity=-other.xVelocity;
      //other.c=[random(0,255),random(0,255),random(0,255)];
      //this.k=2*this.k;
      //this.c=[random(0,255),random(0,255),random(0,255)];
    }
  }
}

function keyPressed() {
  if (key === 's') {
    saveGif('mySketch', 5);
  }
}