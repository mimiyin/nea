let b1, b2;
let b1speed, b2speed;
let splow = 0;
let sphigh = 5;
let low = 0;
let high = 255;
let a = low;
let aspeed = 0.5;
let bg = high;
let m = 120;
let limit;
let anchor;
let go = true;
let debug = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  noCursor();
  randomSeed(0);
  reset();
}

function reset() {
  console.log("RESET");
  limit = height;
  anchor = width;
  a = low;
  b1 = limit * random(0.1, 0.5);
  b2 = limit - b1;
  b1speed = get_speed();
  // Go the opposite way
  b2speed = get_speed();

  console.log("Speeds: " + b1speed, b2speed);
}

// Get the speed
function get_speed() {
  return random(splow, sphigh) * (random(1) < 0.5 ? -1 : 1);
}

function draw() {
  background(bg);
  // Is the background white or black?
  // Make it the oppposite color
  fill(bg > low ? low : high, a);
  rect(0, 0, anchor, b1);
  rect(0, b2, anchor, limit - b2);
  a += aspeed;
  // If fully faded in
  if (a > high + m || a < low - m) {
    b1 += b1speed;
    b2 += b2speed;
    if ((b1 > limit || b1 < 0) && (b2 > limit || b2 < 0)) {
      if (b1 > limit || b2 < 0) {
        // If the background was white, make it black
        bg = bg > low ? low : high;
        console.log(bg);
      }
      reset();
    }
  }

  if(debug) {
    textAlign(RIGHT, BOTTOM);
    textSize(24);
    fill('red');
    text("b1: " + nfs(b1, 0, 2) + "\tb2: " + nfs(b2, 0, 2) + "\tLow: " + splow + "\tHigh: " + sphigh, width, height);
  }
}

function keyPressed() {
  switch(keyCode) {
    case SHIFT:
      debug = !debug;
      break;
    case ENTER:
      reset();
      break;
    case 32:
      go = !go;
      if(go) loop();
      else noLoop();
      break;
    case RIGHT_ARROW:
      splow++;
      break;
    case LEFT_ARROW:
      splow--;
      break;
    case UP_ARROW:
      sphigh--;
      break;
    case DOWN_ARROW:
      sphigh++;
      break;
  }

  // Constraints
  splow = constrain(splow, 0, sphigh);
  sphigh = constrain(sphigh, splow, sphigh);
}
