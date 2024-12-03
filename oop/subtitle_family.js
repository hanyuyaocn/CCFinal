let volhistory = [];
let tex1= "Harry: I don't like always studying extracurricular courses."
let tex2= "James: He still needs to work hard."
let tex3= "Lily: I think he needs some rest."
let idx1=0
let idx2=0
let idx3=0
let typing1=true
let typing2=true
let typing3=true
let string1
let string2
let string3

function setup() {
  createCanvas(900, 220); 
}



function draw() {
  background(0);
  let vol = random(0,1);
  volhistory.push(vol);
  stroke(255);
  noFill();
  
  translate(width / 2, 50);
  beginShape();
  for (let i = 0; i < 360; i++) {
    let r = map(volhistory[i], 0, 1, 1, 50);
    let x = 900*i/360-width/2;
    let y = r * sin(i*PI/180);
    vertex(x, y);
  }
  endShape();
  
  if (volhistory.length > 360) {
    volhistory.splice(0, 1);
  }
  
  if(typing1==true){
  string1 = tex1.substring(0, idx1);
  fill(255);
  textSize(20);
  textAlign(LEFT, CENTER);
  text(string1, -450, 100);
  idx1++;
  }
  if (idx1 > tex1.length) {
    typing1=false
    text(string1, -450, 100);
  }
  if(typing1==false){
  string2 = tex2.substring(0, idx2);
  fill(255);
  textSize(20);
  textAlign(LEFT, CENTER);
  text(string2, -450, 130);
  idx2++;
  }
  if (idx2 > tex2.length) {
    typing2=false
    text(string2, -450, 130);
  }
  if(typing2==false){
  string3 = tex3.substring(0, idx3);
  fill(255);
  textSize(20);
  textAlign(LEFT, CENTER);
  text(string3, -450, 160);
  idx3++;
  }
  if (idx3 > tex3.length) {
    typing3=false
    text(string3, -450, 160);
  }
  

  
  
  
  
}