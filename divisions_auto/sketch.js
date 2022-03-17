let x;
let a1, a2;
let aspeed1 = 0.1;
let aspeed2 = 0.1;
let low = 0;
let high = 145;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  a1 = 145;
  a2 = 145;
  x = width / 2;
}

function draw() {
  background(0);
  a1 += aspeed1;
  a2 += aspeed2
  a1 = constrain(a1, low - 1, high + 1);
  a2 = constrain(a2, low - 1, high + 1);
	//console.log(a1, a2);
  if ((a1 < low && a2 < low) || (a1 > high && a2 > high)) {
    console.log("NEW DIVISION");
    x = random(width);
    bounce(x);
  }
  else if ((a1 < low && a2 > high) || (a1 > high && a2 < low)) {
    console.log("REVERSE");
    bounce(random(width));
  }

  fill(255, a1);
  rect(0, 0, x, height);
  fill(255, a2);
  rect(x, 0, width - x, height);
}

function bounce(_x) {
  a1 = aspeed1 > 0 ? high : low;
  a2 = aspeed2 > 0 ? high : low;
  let rmult = pow(2, random(1));
  if (_x < x) aspeed1 *= -1*rmult;
  else aspeed2 *= -1*rmult;
  console.log(aspeed1, aspeed2, a1, a2);

}