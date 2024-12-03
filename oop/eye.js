let mora;

function setup() {
  
  createCanvas(1200,100);

 
  mora = new Mora(width / 2, 0);
}

function draw() {
  
  background(0,0,160);

  mora.update();
  mora.display();
  stroke(100,0,0)
  line(90,0,90,30);
  line(90,30,100,40);
  noFill();
  circle(105,45,10);
  fill(0)
  beginShape();
  vertex(450,0);
  vertex(450,30);
  vertex(513,53);
  vertex(507,40);
  vertex(470,30);
  vertex(470,0);
  endShape();
  beginShape();
  vertex(750,0);
  vertex(750,30);
  vertex(685,53);
  vertex(693,40);
  vertex(730,30);
  vertex(730,0);
  endShape();
  

  
}

function keyPressed() {
  if (key === 's') {
    saveGif('D:/sketch.gif',5);
  }
}

class Mora {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.pupilSize = 30;
    this.pupilX = 0;
    this.pupilY = 0;
    this.targetX = 0;
    this.targetY = 0;
    this.startTime = millis();
    this.duration = 3000;
  }
  update() {
    if (millis() > this.startTime + this.duration) {
      this.targetX = random(-60, 60);
      this.targetY = random(0, 60);
      this.startTime = millis();
    }

    let t = (millis() - this.startTime) / this.duration;
    t = constrain(t, 0, 1);

    this.pupilX = lerp(this.pupilX, this.targetX, t);
    this.pupilY = lerp(this.pupilY, this.targetY, t);
  }
  display() {
    push();
    translate(this.x, this.y);
    noStroke()
    fill(100)
    circle(0,0,200)
    fill(255)
    circle(0,0,160)

    fill(0);
    ellipse(this.pupilX, this.pupilY, this.pupilSize);

    pop();
  }
}