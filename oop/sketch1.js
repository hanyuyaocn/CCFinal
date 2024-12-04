class Wall {
  draw() {
    stroke(150);
    strokeWeight(3);
    line(width / 2, 0, width / 2, height);
  }
}

class Desk {
  draw() {
    fill(150, 75, 0);
    rect(50, height - 150, 300, 60); 
    rect(60, height - 90, 20, 50); 
    rect(320, height - 90, 20, 50); 
  }
}

class Window {
  draw() {
    fill(200, 240, 255);
    rect(200, 50, 150, 100); 
    stroke(150);
    line(200, 100, 350, 100);
    line(275, 50, 275, 150); 
  }
}

class Book {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    rect(this.x, this.y, 40, 10); 
  }
}

class Son {
  constructor() {
    this.x = 100;
    this.y = height - 150;
    this.waving = false;
    this.armAngle = 0;
    this.armDirection = 1;
  }

  draw() {
    fill(255, 220, 180);
    ellipse(this.x, this.y, 40, 40);
    fill(0, 100, 255);
    rect(this.x - 15, this.y + 20, 30, 50, 5);
    stroke(255, 220, 180);
    strokeWeight(4);
    if (this.waving) {
      let waveOffset = sin(this.armAngle) * 20;
      line(this.x - 15, this.y + 30, this.x - 40, this.y + 30 + waveOffset); 
      line(this.x + 15, this.y + 30, this.x + 40, this.y + 30 + waveOffset); 
      this.armAngle += 0.1 * this.armDirection;
      if (this.armAngle > PI / 4 || this.armAngle < -PI / 4) {
        this.armDirection *= -1;
      }
      // Move son out of the room
      if (this.x < width / 2 - 40) {
        this.x += 2;
      }
    } else {
      line(this.x - 15, this.y + 30, this.x - 40, this.y + 50); 
      line(this.x + 15, this.y + 30, this.x + 40, this.y + 50); 
    }
    stroke(0, 100, 255);
    line(this.x - 10, this.y + 70, this.x - 10, this.y + 90); 
    line(this.x + 10, this.y + 70, this.x + 10, this.y + 90); 
  }
}

class Parent {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.waving = false;
    this.armAngle = 0;
    this.armDirection = 1;
  }

  draw() {
    
    fill(255, 220, 180);
    stroke(255,220,180)
    ellipse(this.x, this.y - 60, 40, 40);
    fill(0, 0, 255);
    stroke(255,0,0)
    rect(this.x - 20, this.y - 50, 40, 70, 5);
    stroke(255, 220,180);
    strokeWeight(4);
    if (this.waving) {
      let waveOffset = sin(this.armAngle) * 20;
      line(this.x - 20, this.y - 40, this.x - 40, this.y - 40 + waveOffset); 
      line(this.x + 20, this.y - 40, this.x + 40, this.y - 40 + waveOffset);
      this.armAngle += 0.1 * this.armDirection;
      if (this.armAngle > PI / 4 || this.armAngle < -PI / 4) {
        this.armDirection *= -1;
      }
    } else {
      line(this.x - 20, this.y - 40, this.x - 40, this.y - 20); 
      line(this.x + 20, this.y - 40, this.x + 40, this.y - 20); 
    }
    stroke(255, 255, 180);
    line(this.x - 10, this.y + 20, this.x - 10, this.y + 40); 
    line(this.x + 10, this.y + 20, this.x + 10, this.y + 40); 
  }
}

class Television {
  draw() {
    fill(50);
    rect(width - 160, height - 160, 120, 80);
    fill(200);
    rect(width - 155, height - 155, 110, 70);
    fill(0);
    rect(width - 200, height - 80, 200, 30);

  }
}

let wall, desk, windowPane, son, parents, television, books;

function setup() {
  createCanvas(900, 400);

  
  wall = new Wall();
  desk = new Desk();
  windowPane = new Window();
  son = new Son();
  books = [];
  for (let i = 0; i < 5; i++) {
    books.push(new Book(200, height - 160+5*i));
  }
  parents = [new Parent(width / 2 + 100, height - 100), new Parent(width / 2 + 200, height - 100)];
  television = new Television();
}

function draw() {
  background(220);

  
  wall.draw();

  
  desk.draw();
  windowPane.draw();
  son.draw();
  books.forEach((book) => book.draw());

  
  television.draw();
  parents.forEach((parent) => parent.draw());
}

function keyPressed() {
  if (key === "a" || key === "A") {
    son.waving = true; 
    parents.forEach((parent) => (parent.waving = true)); 
  }
  if (key === "b" || key === "B") {
    books.push(new Book(200, height -50-20*books.length)); 
  }
}
