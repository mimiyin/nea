let r = 1;
let rmult = 1;
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
    text('speed: ' + nfs(r, 0, 2) + '\trmult: ' + floor(rmult), width, height);
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
      sxspeed = random(r, rmult * r);
      syspeed = random(1) < 0.5 ? random(-rmult * r, -r) : random(r, rmult * r);
      exspeed = random(r, rmult * r);
      eyspeed = random(1) < 0.5 ? random(-rmult * r, -r) : random(r, rmult * r);
      break;
      // RIGHT
    case 1:
      sx = random(width, width + margin);
      sy = random(height);
      ex = random(width, width + margin);
      ey = random(height);
      sxspeed = random(-rmult * r, -r);
      syspeed = random(1) < 0.5 ? random(-rmult * r, -r) : random(r, rmult * r);
      exspeed = random(-rmult * r, -r);
      eyspeed = random(1) < 0.5 ? random(-rmult * r, -r) : random(r, rmult * r);
      break;
      // TOP
    case 2:
      sx = random(width);
      sy = random(-margin, 0);
      ex = random(width);
      ey = random(-margin, 0);
      sxspeed = random(1) < 0.5 ? random(-rmult * r, -r) : random(r, rmult * r);
      syspeed = random(r, rmult * r);
      exspeed = random(1) < 0.5 ? random(-rmult * r, -r) : random(r, rmult * r);
      eyspeed = random(r, rmult * r);
      break;
      // BOTTOM
    case 3:
      sx = random(width);
      sy = random(height, height + margin);
      ex = random(width);
      ey = random(height, height + margin);
      sxspeed = random(1) < 0.5 ? random(-rmult * r, -r) : random(r, rmult * r);
      syspeed = random(-rmult * r, -r);
      exspeed = random(1) < 0.5 ? random(-rmult * r, -r) : random(r, rmult * r);
      eyspeed = random(-rmult * r, -r);
  }
  console.log("SPEEDS: ", floor(sxspeed), floor(syspeed), floor(exspeed), floor(eyspeed));
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
      rmult++;
      break;
    case LEFT_ARROW:
      rmult--;
      break;
    case UP_ARROW:
      r --;
      break;
    case DOWN_ARROW:
      r ++;
      break;
    case SHIFT:
      debug = !debug;
      break;
  }
}
