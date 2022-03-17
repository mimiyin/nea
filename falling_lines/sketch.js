let r = 0.05;
let sx, sy, ex, ey;
let sxspeed, syspeed, exspeed, eyspeed;

function setup() {
  createCanvas(windowWidth, windowHeight);
  init();
  stroke(255);
}

function draw() {
  background(0);
  sx += sxspeed;
  sy += syspeed;
  ex += exspeed;
  ey += eyspeed;
  line(sx, sy, ex, ey);
}

function init() {
  // Left
  if (random(1) > 0.75) {
    sx = random(-width, 0);
    sy = random(height);
    ex = random(-width, 0);
    ey = random(height);
    sxspeed = random(0, 2 * r);
    syspeed = random(-r, r);
    exspeed = random(0, 2 * r);
    eyspeed = random(-r, r);

  }
  // Right
  else if (random(1) > 0.5) {
    sx = random(width, width *2);
    sy = random(height);
    ex = random(width, width *2);
    ey = random(height);
    sxspeed = random(-2 * r, 0);
    syspeed = random(-r, r);
    exspeed = random(-2 * r, 0);
    eyspeed = random(-r, r);
  }
  // Top
  else if (random(1) > 0.25) {
    sx = random(width);
    sy = random(-height, 0);
    ex = random(width);
    ey = random(-height, 0);
    sxspeed = random(-r, r);
    syspeed = random(0, 2 * r);
    exspeed = random(-r, r);
    eyspeed = random(0, 2 * r);
  }
  // Bottom
  else {
    sx = random(width);
    sy = random(height, height * 2);
    ex = random(width);
    ey = random(height, height * 2);
    sxspeed = random(-r, r);
    syspeed = random(-2 * r, 0);
    exspeed = random(-r, r);
    eyspeed = random(-2 * r, 0);
  }
}

function mousePressed() {

  r = 10 * (mouseX / width);
  init();
  print("HI", sx, sxspeed);
}
