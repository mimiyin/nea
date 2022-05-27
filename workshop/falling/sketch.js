let r = 1;
let sx, sy, ex, ey;
let sxspeed, syspeed, exspeed, eyspeed;
let t = {};
let debug = true;

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
    textAlign(RIGHT, BOTTOM);
    fill('red');
    noStroke();
    text('r: ' + nfs(r, 0, 2), width, height);
    pop();
  }
}

function init(side) {
  // Left
  switch (side) {
    case 0:
      sx = random(-width, 0);
      sy = random(height);
      ex = random(-width, 0);
      ey = random(height);
      sxspeed = random(0, 2 * r);
      syspeed = random(-r, r);
      exspeed = random(0, 2 * r);
      eyspeed = random(-r, r);
      break;
    case 1:
      sx = random(width, width * 2);
      sy = random(height);
      ex = random(width, width * 2);
      ey = random(height);
      sxspeed = random(-2 * r, 0);
      syspeed = random(-r, r);
      exspeed = random(-2 * r, 0);
      eyspeed = random(-r, r);
      break;
    case 2:
      sx = random(width);
      sy = random(-height, 0);
      ex = random(width);
      ey = random(-height, 0);
      sxspeed = random(-r, r);
      syspeed = random(0, 2 * r);
      exspeed = random(-r, r);
      eyspeed = random(0, 2 * r);
      break;
    default:
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
      r += 0.05;
      break;
    case RIGHT_ARROW:
      r -= 0.05;
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
