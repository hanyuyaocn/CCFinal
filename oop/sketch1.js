let o = [0, 102, 204]; // Water color
let yBubble = [];
let xBubble = [];
let sizeBubble = [];
let vUp = 5;
let xWeed = [];
let rd = [];
let wWeed;
let waveX1 = 0, waveY1, offset1 = 0, strum = 0.3, angle1;

let sunX, sunY, moonX, moonY;
let angle = 0;
let r = 1;  // Rotation rate coefficient
let centerX = 400, centerY = 500;
let radius = 400;  

let accel;
let omega;
let density = 10;
let opacity = 90;
let length = 200;
let rising = true;

let noiseValw;
let noiseValh;
let angVel = 0.1;
let hClock;

function setup() {
  createCanvas(800, 500);

  // Initialize bubbles
  for (let i = 0; i < 4; i++) {
    xBubble[i] = random(50, width - 50);
    sizeBubble[i] = random(10, 60);
    yBubble[i] = 400;
  }

  // Initialize weeds
  for (let i = 0; i < 4; i++) {
    xWeed[i] = random(50, width - 50);
    rd[i] = random(100);
  }

  wWeed = random(10);
  waveY1 = 2 * width / 3;
  omega = PI / 10;
  accel = PI / 5000;
  hClock = height; // Initial position of the clock
}

function draw() {
  // Draw the scenery (sun, moon, water, bubbles, seaweed)
  drawScenery();

  // Draw the clock as it rises and the visual effects when it stops rising
  if (rising && hClock >= 200) {
    drawClock(); // Draw the clock as it's rising
    hClock -= 2; // Move the clock up
  }

  if (hClock < 200) {
    rising = false; 
    drawVisual(); 
    drawClock(); 
  }
}

function drawScenery() {
  sunX = centerX + radius * cos(angle);
  sunY = centerY + radius * sin(angle);
  moonX = centerX + radius * cos(angle + PI);
  moonY = centerY + radius * sin(angle + PI);

  if (sunY < height) {
    background(135, 206, 235, opacity);
  } else {
    background(25, 25, 112, opacity);
  }

  stroke(255);  
  strokeWeight(2);

  if (sunY < height) {
    fill(255, 204, 0); 
    ellipse(sunX, sunY, 80, 80);  
  }

  if (moonY < height) {
    fill(200); 
    ellipse(moonX, moonY, 60, 60); 
  }


  angle += 0.01 * r;

 
  noStroke();  
  fill(o);   
 
  drawWaves(275, 290, 0.5);
  drawWaves(275, 290, -0.5);

  // Draw bubbles
  strokeWeight(1);
  fill(0, 120, 240);
  for (let i = 0; i < 4; i++) {
    circle(xBubble[i], yBubble[i], sizeBubble[i]);

 
    yBubble[i] -= vUp * noise(sizeBubble[i])*r;

    xBubble[i] += 2 * sin(noise(frameCount * 0.5));

  
    if (r > 0 && yBubble[i] < 325) { 
      yBubble[i] = height;
      xBubble[i] = random(50, width - 50);
      sizeBubble[i] = random(10, 60);
    } else if (r < 0 && yBubble[i] > height) {  
    yBubble[i] = 325;
    xBubble[i] = random(50, width - 50);
    sizeBubble[i] = random(10, 60);
    }
  }


  // Draw seaweed
  stroke(0, 160, 0);
  strokeWeight(wWeed);
  fill(0, 160, 0);
  for (let i = 0; i < 4; i++) {
    drawSeaweed(xWeed[i], rd[i]);
  }
}

function drawWaves(minY, maxY, sign) {
  stroke(255);
  strokeWeight(2);
  beginShape();
  vertex(0, height);
  for (waveX1 = 0; waveX1 < width+50; waveX1 += 10) {
    angle1 = offset1 + waveX1 * 0.01 * abs(r);
    waveY1 = map(sign * sin(0.5 * angle1), -strum, strum, minY, maxY);
    vertex(waveX1, waveY1);
  }
  vertex(width, height);
  endShape();
  offset1 += 0.1 * abs(r);
}

function drawSeaweed(x, r) {
  beginShape();
  curveVertex(x, height);
  curveVertex(x - 3 * sin(0.01 * frameCount + PI / 2), height - 60 * noise(r));
  curveVertex(x - 3 * sin(0.01 * frameCount + PI), height - 105 * noise(r));
  curveVertex(x - 3 * sin(0.01 * frameCount + 3 * PI / 2), height - 135 * noise(r));
  curveVertex(x - 3 * sin(0.01 * frameCount), height - 150 * noise(r));
  endShape(CLOSE);
}

function mousePressed() {
  if (mouseButton == LEFT) {
    r += 0.5;  // Increase sun/moon rotation rate
  }
  if (mouseButton == RIGHT) {
    r -= 0.5;  // Decrease sun/moon rotation rate
  }
}

function drawVisual() {
  noStroke();
  rectMode(CENTER);

  for (let i = 0; i < 2; i++) {
    push();
    translate(mouseX, hClock);
    for (let angle = 0; angle <= 2 * PI; angle += omega) {
      push();
      for (let x = 75; x < length; x += density) {
        fill(255 - x, 0, x);
        rotate(angle * Math.sign(r)); 
        if (i == 0) rect(x, 0, density, density); 
        else rect(-x, 0, density, density);
      }
      pop();
    }
    pop();
  }

  omega += accel * abs(r);  
  if (omega > 2 * PI || omega < PI / 10) {
    accel = -accel;
  }
}


function drawClock() {
  
  noiseValw = noise(0.1 * frameCount);
  noiseValh = noise(0.2 * frameCount);
  let mapClockw = map(noiseValw, 0, 1, 0.3, 1.5);
  let mapClockh = map(noiseValh, 0, 1, 0.3, 1.5);
  
  stroke(100, 0, 0);
  strokeWeight(10);
  noFill();
  ellipse(mouseX, hClock, 150 * mapClockw, 150 * mapClockh); 
  
  
  strokeWeight(10);
  line(mouseX, hClock, mouseX + 40 * mapClockw * cos(12 * frameCount), hClock - 40 * mapClockh * sin(12 * frameCount));
}

function keyPressed() {
  if (key === 's') {
    saveGif('mySketch', 5);
  }
}