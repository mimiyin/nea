let isRotate = true;
let a = 1;
let aspeed = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  aspeed = map(mouseX, 0, width, 0, 0.1);
  a += aspeed;
  rotate(a)
  stroke(255, 32);
  for (let theta = 0; theta < TWO_PI; theta += TWO_PI/200) {
    let x = cos(theta) * height;
    let y = sin(theta) * height;
    line(0, 0, x, y);
  }
}
