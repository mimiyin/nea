let c = 0;
let sx, sy, tsx, tsy, ex, ey, x, y;
let xspeed, yspeed;
let go = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  tsx = width / 2;
  tsy = 0;
  sx = tsx;
  sy = tsy;
  ex = sx;
  ey = 10;
  init();
  stroke(0);
  strokeWeight(10);
}

function draw() {
  background(255);
  if (go) {
    x += xspeed;
    y += yspeed;
  }
  line(sx, sy, x, y);
}

function init() {
  sx = tsx;
  sy = tsy;
  x = sx;
  y = sy;
  let d = createVector(ex-tsx, ey-tsy);
  xspeed = d.x * 0.01;
  yspeed = d.y * 0.01;
}

function keyPressed() {
  go = !go;
}

function mousePressed() {
  c++;
  if (c % 2 == 0) {
    ex = mouseX;
    ey = mouseY;
    init();
  } else {
    tsx = mouseX;
    tsy = mouseY;
  }

}
