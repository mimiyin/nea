let b;
let a1, a2;
let aspeed1 = 0.1;
let aspeed2 = 0.1;
let low = 0;
let high = 145;
let horizontal = true;


function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  a1 = 145;
  a2 = 145;
  b = width / 2;
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
    b = random(horizontal ? width : height);
    bounce(b);
  } else if ((a1 < low && a2 > high) || (a1 > high && a2 < low)) {
    console.log("REVERSE");
    bounce(random(horizontal ? width : height));
  }

  if (horizontal) {
    fill(255, a1);
    rect(0, 0, b, height);
    fill(255, a2);
    rect(b, 0, width - b, height);
  }
  else {
    fill(255, a1);
    rect(0, 0, width, b);
    fill(255, a2);
    rect(0, b, width, height - b);
  }
}

function bounce(_b) {
  a1 = aspeed1 > 0 ? high : low;
  a2 = aspeed2 > 0 ? high : low;
  let rmult = pow(2, random(1));
  if (_b < b) aspeed1 *= -1 * rmult;
  else aspeed2 *= -1 * rmult;
  console.log(aspeed1, aspeed2, a1, a2);

}

function keyPressed() {
  horizontal = !horizontal;
}
