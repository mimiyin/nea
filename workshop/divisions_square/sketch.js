let b1, b2;
let b1speed, b2speed;
let speed = 5;
let low = 0;
let high = 255;
let a = low;
let aspeed = 0.5;
let bg = high;
let m = 120;
let limit;
let anchor;

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
  b1speed = random(-speed, speed); //random(1) > 0.5 ? -speed : speed;
  // Go the opposite way
  b2speed = random(-speed, speed); //b1speed > 0 ? -speed : speed;
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
}

function keyPressed() {
  if(keyCode == 32) reset();
}
