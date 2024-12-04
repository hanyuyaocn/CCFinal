let time = 0;
let duration = 200;
let brightness = 255;

function setup() {
  createCanvas(300, 300);
  noStroke();
}

function draw() {
  background(0);

  time+=1;
  if (time % duration === 0) {
    brightness = random(150, 255);
    duration = int(random(100, 400));
  }

  fill(brightness, 100, random(150, 255));
  rect(0, 0, 300, 300);

  if (random(1) < 0.05) {
    weird();
  }
}

function weird() {
  let type = int(random(3));

  if (type === 0) {
    let y = int(random(50, 250));
    fill(random(255), random(255), random(255));
    rect(0, y, width, 10);
  } else if (type === 1) {
    let x = int(random(50, 250));
    fill(random(255), random(255), random(255));
    rect(x, 0, 10, height);
  } else {
    for (let i = 0; i < random(5, 20); i++) {
      let x = int(random(width));
      let y = int(random(height));
      fill(random(255), random(255), random(255));
      rect(x, y, 5, 5);
    }
  }
}

