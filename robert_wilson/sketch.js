let y1, y1a, y2, y3, y3a, y4;
let hspeed = 0.01;
let h = 0;
let bg = 0;
let c = h * 10;
let d = c;

function setup() {
  createCanvas(windowWidth, windowHeight);
  y1 = (height / 2) - (h / 2);
  y1a = y1;
  y3a = y3;
  widen();
  noStroke();
  noCursor();
}

function widen() {
  c++;
  y2 = y1 - (pow(c * 0.0005, 10));
  y3 = y1 + h;
  y4 = y3;
}

function draw() {
  background(bg);
  h += hspeed;
  y1 -= hspeed / 2;
  if (abs(y2 - y1) > 1) {
    y1a += 0.01;
    d++;
    y3a = y4 + (pow(d * 0.001, 10));
    if (y2 < 5) {
      bg++;
      //console.log("SHRINKING");
    }
  } else {
    y1a = y1;
    y3a = y3;
  }
  widen();
  //console.log(abs(y2 - y1));

  fill(255);
  beginShape();
  vertex(0, y1a);
  vertex(width, y2);
  vertex(width, y3a);
  vertex(0, y4);
  endShape();

  //text(y2, 100, 100);
}