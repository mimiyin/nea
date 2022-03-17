let sz = 0;
let invert = true;
let x = 0;
let y = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(invert ? 0: 255);
  sz+=0.1;
  fill(invert ? 255: 0);
  ellipse(x, y, sz, sz);
}

// Invert black and white
function keyPressed(){
 invert = !invert;
}

function mousePressed() {
  x = mouseX;
  y = mouseY;
}
