let x1, x2;
let xspeed1, xspeed2;
let speed = 5;
let low = 0;
let high = 255;
let a = low;
let aspeed = 0.5;
let bg = high;
let m = 120;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  noCursor();
  randomSeed(0);
  reset();
}

function reset() {
  console.log("RESET");
  a = low;
  x1 = width * random(0.1, 0.5);
  x2 = width - x1;
  xspeed1 = random(-speed, speed); //random(1) > 0.5 ? -speed : speed;
  // Go the opposite way
  xspeed2 = random(-speed, speed); //xspeed1 > 0 ? -speed : speed;
}

function draw() {
  background(bg);
  // Is the background white or black?
  // Make it the oppposite color
  fill(bg > low ? low : high, a);
  rect(0, 0, x1, height);
  rect(x2, 0, width - x2, height);
  a += aspeed;
  // If fully faded in
  if (a > high + m || a < low - m) {
    x1 += xspeed1;
    x2 += xspeed2;
    if ((x1 > width || x1 < 0) && (x2 > width || x2 < 0)) {
      if (x1 > width || x2 < 0) {
        // If the background was white, make it black
        bg = bg > low ? low : high;
        console.log(bg);
      }
      reset();
    }
  }
}
