let teacher, phone, classroom;

function setup() {
  createCanvas(900, 400);
  textAlign(CENTER, CENTER);
  textSize(16);
  teacher = new Teacher(width / 4, height / 2);
  phone = new Phone(width * 3 / 4, height / 2);
  classroom = new Classroom(width / 4, height / 2);
}

function draw() {
  background(240);
  stroke(0);
  line(width / 2, 0, width / 2, height);
  classroom.display();
  teacher.display();
  phone.display();
}

function keyPressed() {
  if (key === 'a') {
    teacher.ringPhone();
    phone.displayCriticism();
  } else if (key === 'b') {
    teacher.stopRinging();
    phone.displaySupport();
  }
}

class Teacher {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.ringing = false;
    this.history = "Traveling History:\nGym -> Cafe -> Park -> Hospital";
  }

  display() {
    fill(150, 200, 255);
    noStroke();
    rect(this.x - 40, this.y, 80, 120, 10);
    fill(255, 200, 200);
    ellipse(this.x, this.y - 40, 60);
    if (this.ringing) {
      stroke(255, 0, 0);
      noFill();
      ellipse(this.x + 40, this.y + 20, 40);
      ellipse(this.x + 40, this.y + 20, 60);
    }
    fill(50);
    rect(this.x + 30, this.y + 10, 20, 30, 5);
  }

  ringPhone() {
    this.ringing = true;
    phone.setHistory(this.history);
  }

  stopRinging() {
    this.ringing = false;
  }
}

class Phone {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.message = "";
    this.history = "";
  }

  display() {
    fill(200);
    rect(this.x - 100, this.y - 150, 200, 300, 10);
    fill(255);
    rect(this.x - 90, this.y - 140, 180, 280, 10);
    fill(50);
    textSize(12);
    text(this.history + "\n\n" + this.message, this.x - 90, this.y - 100, 180, 280);
  }

  setHistory(history) {
    this.history = history;
  }

  displayCriticism() {
    this.message = "Netizens:\nWhy did the teacher go to so many places?\nDon't they have work to do?";
  }

  displaySupport() {
    this.message = "Headmaster: Please take care of your health.\nYou don't have to attend the meeting this afternoon, have a good rest!";
  }
}

class Classroom {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.desks = [];
    this.students = [];
    for (let i = -100; i <= 100; i += 100) {
      this.desks.push({ x: this.x + i, y: this.y + 150 });
      this.students.push({ x: this.x + i, y: this.y + 120 });
    }
  }

  display() {
    fill(0, 100, 0);
    rect(this.x - 150, this.y - 150, 300, 100, 5);
    fill(255);
    textSize(14);
    text("1+1=2", this.x, this.y - 100);
    for (let i = 0; i < this.desks.length; i++) {
      fill(200, 150, 100);
      rect(this.desks[i].x - 30, this.desks[i].y, 60, 20);
      fill(255, 220, 180);
      ellipse(this.students[i].x, this.students[i].y + 20, 40);
      fill(150, 200, 255);
      rect(this.students[i].x - 20, this.students[i].y + 30, 40, 50, 5);
    }
  }
}
