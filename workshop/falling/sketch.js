let r = 1;
let sx, sy, ex, ey;
let sxspeed, syspeed, exspeed, eyspeed;
let t = {};
let debug = true;
let margin = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
  init();
  stroke(255);
  strokeWeight(5);
  noCursor();
}

function draw() {
  background(0);
  sx += sxspeed;
  sy += syspeed;
  ex += exspeed;
  ey += eyspeed;
  line(sx, sy, ex, ey);

  if (debug) {
    push();
    textSize(24);
    textAlign(RIGHT, BOTTOM);
    fill('red');
    noStroke();
    text('speed: ' + nfs(r, 0, 2) + '\tmargin: ' + floor(margin), width, height);
    pop();
  }
}

function init(side) {
  switch (side) {
    // LEFT
    case 0:
      sx = random(-margin, 0);
      sy = random(height);
      ex = random(-margin, 0);
      ey = random(height);
      sxspeed = random(r, 2 * r);
      syspeed = random(1) < 0.5 ? random(-2 * r, -r) : random(r, 2 * r);
      exspeed = random(r, 2 * r);
      eyspeed = random(1) < 0.5 ? random(-2 * r, -r) : random(r, 2 * r);
      break;
      // RIGHT
    case 1:
      sx = random(width, width + margin);
      sy = random(height);
      ex = random(width, width + margin);
      ey = random(height);
      sxspeed = random(-2 * r, -r);
      syspeed = random(1) < 0.5 ? random(-2 * r, -r) : random(r, 2 * r);
      exspeed = random(-2 * r, -r);
      eyspeed = random(1) < 0.5 ? random(-2 * r, -r) : random(r, 2 * r);
      break;
      // TOP
    case 2:
      sx = random(width);
      sy = random(-margin, 0);
      ex = random(width);
      ey = random(-margin, 0);
      sxspeed = random(1) < 0.5 ? random(-2 * r, -r) : random(r, 2 * r);
      syspeed = random(r, 2 * r);
      exspeed = random(1) < 0.5 ? random(-2 * r, -r) : random(r, 2 * r);
      eyspeed = random(r, 2 * r);
      break;
      // BOTTOM
    case 3:
      sx = random(width);
      sy = random(height, height + margin);
      ex = random(width);
      ey = random(height, height + margin);
      sxspeed = random(1) < 0.5 ? random(-2 * r, -r) : random(r, 2 * r);
      syspeed = random(-2 * r, -r);
      exspeed = random(1) < 0.5 ? random(-2 * r, -r) : random(r, 2 * r);
      eyspeed = random(-2 * r, -r);
  }
  console.log("POINTS: ", sx, sy, ex, ey);
}

// function mousePressed() {
//   t.start = millis();
// }
//
// function mouseClicked() {
//   t.end = millis();
//   t.time = t.end - t.start;
//   r = map(t.time, 0, 5000, 5, 0);
//   r = constrain(r, 0.001, 5);
//
//   // Left, Right, Top, Down
//   let sides = [mouseX, width - mouseX, mouseY, height - mouseY];
//   let side = sides.indexOf(min(sides));
//
//   init(side);
//   print("TIME:", floor(t.time));
// }

// Randomly choose a side
function keyPressed() {
  switch (key) {
    case '1':
      init(2);
      break;
    case '2':
      init(1);
      break;
    case '3':
      init(3);
      break;
    case '4':
      init(0);
      break;
  }
  switch (keyCode) {
    case ENTER:
      init(floor(random(4)));
      break;
    case RIGHT_ARROW:
      margin += 100;
      break;
    case LEFT_ARROW:
      margin -= 100;
      break;
    case UP_ARROW:
      r -= 0.1;
      break;
    case DOWN_ARROW:
      r += 0.1;
      break;
    case SHIFT:
      debug = !debug;
      break;
  }
}
