

let tex="I AM ALL AROUND YOU!"
let idx=0
var capture;
let string;
let typing=true;
var w = 900,
    h = 400;

function setup() {
    capture = createCapture({
        audio: false,
        video: {
            width: w,
            height: h
        }
    }, function() {
        console.log('capture ready.')
    });
    createCanvas(w, h);
    capture.size(w, h);
    capture.hide();

}

function draw() {
    image(capture, 0, 0, w, h);
  if(typing==true){
   string = tex.substring(0, idx);
  fill(255);
  textSize(50);
  fill(255,0,0)
  textAlign(LEFT, CENTER);
  text(string, 180, 100);
  idx++;
  }
  if (idx > tex.length) {
    typing1=false
    text(string, 180, 100);
  }

    
}