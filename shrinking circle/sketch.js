let r;
let x;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  x = 0;
  r = width;

}



function draw() {
  background(0);
  x+=0.01;
  r -= pow(x, -1);
  r = max(r, 0);
  console.log(x, pow(x, 10));
  ellipse(width / 2, height / 2, r, r);
}



function mousePressed() {
  if (r < 0) r = 10000;
  x = 0;

}