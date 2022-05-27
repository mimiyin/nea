let x,y;
const SZ = 50;
let rinterval = 60;
let a = 0;
let debug = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
  smooth();
}

function draw() {
  background(0);
  if(frameCount%rinterval < 1) init();

  a += rinterval/255;
  fill(255, a);
  rect(x, y, SZ, SZ);
  if (debug) {
    fill(255, 0, 0);
    textAlign(RIGHT, BOTTOM)
    text("Interval: " + nfs(rinterval, 0, 2), width, height);
  }
}

function init() {
  x = random(SZ, width);
  y = random(SZ, height-SZ);
  rinterval = random(30, 3000);
  a = 0;
}

function keyPressed() {
  if(keyCode == 32) init();
  if(key == 'd') debug = true;
  if(key == 'f') debug = false;
}
