let x,y;
let sz = 50;
let rinterval = 60;
let a = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
  smooth();
}

function draw() {
  background(0);
  if(frameCount%rinterval < 1) {
    x = random(sz, width);
    y = random(sz, height-sz);
    rinterval = random(30, 3000);
    a = 0;
    console.log("NEW", rinterval);
  }
  a += rinterval/255;
  fill(255, a);
  ellipse(x, y, sz, sz);
}