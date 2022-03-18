let x1, x2, y1, y2;
let xspeed1, xspeed2, yspeed1, yspeed2;
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
  randomSeed(5);
  reset();
}

function reset() {
  console.log("RESET");
  a = low;
  x1 = width * random(0.1, 0.5);
  x2 = width - x1;


  y1 = x1; //height * random(0.1, 0.5);
  y2 = height - y1;
  function resetSpeeds() {
    xspeed1 = random(-speed, speed); //random(1) > 0.5 ? -speed : speed;
    // Go the opposite way
    xspeed2 = random(-speed, speed); //xspeed1 > 0 ? -speed : speed;

    yspeed1 = random(-speed, speed); //random(1) > 0.5 ? -speed : speed;
    // Go the opposite way
    yspeed2 = random(-speed, speed); //xspeed1 > 0 ? -speed : speed;

  }
  // Reset speeds
  resetSpeeds();

  // Don't allow both dimensions to go in the same direction
  while((Math.sign(xspeed1) == Math.sign(xspeed2)) && (Math.sign(yspeed1) == Math.sign(yspeed2))) {
    resetSpeeds();
  }
}

function draw() {
  background(bg);
  // Is the background white or black?
  // Make it the oppposite color
  fill(bg > low ? low : high, a);

  beginShape();
  vertex(x1, y1);
  vertex(x2, y1);
  vertex(x2, y2);
  vertex(x1, y2);
  vertex(x1, y1);
  endShape(CLOSE);

  // Left right rectangles
  // rect(0, 0, x1, height);
  // rect(x2, 0, width - x2, height);

  // Top bottom rectangles
  // rect(0, 0, width, y1);
  // rect(0, y2, width, height - y2);

  a += aspeed;
  // If fully faded in
  if (a > high + m || a < low - m) {
    x1 += xspeed1;
    x2 += xspeed2;
    y1 += yspeed1;
    y2 += yspeed2;
    let xd = x2-x1;
    let yd = y2-y1;
    let x1x2out = (x1 < 0 || x1 > width) && (x2 < 0 || x2 > width);
    let y1y2out = (y1 < 0 || y1 > height) && (y2 < 0 || y2 > height);
    if ((x1x2out  && y1y2out ) || xd < 0 || yd < 0) {
      if (x1 > width || x2 < 0 || y1 > height || y2 < 0) {
        // If the background was white, make it black
        bg = bg > low ? low : high;
        console.log(bg);
      }
      reset();
    }
  }
}
