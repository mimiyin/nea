 // Position of 2 people
let x1, y1, x2, y2;

// Flip of divison?
let flip = true;

// Average midpoints
let mids = [];
// Average angles
let dxys = [];

// Average midpoint over time
let amid = {
  x: 0,
  y: 0
};

// Average relative positions over time
let adxy = {
  x: 0,
  y: 0
};

// Diag of canvas
let diag = 0;

// Refresh rate 1s
let rr = 60 * 10;
// Smoothing over 5s
let ts = 60 * 10

// Alpha
let a = -1;
let amax = 255;
let aspeed = 1;
let adir = 1;

// Auto-pilot
let auto1 = false;
let auto2 = false;
let xspeed1 = 1;
let xspeed2 = 1;
let yspeed1 = 1;
let yspeed2 = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Start off on a diagonal
  x1 = width * 0.45;
  y1 = height * 0.5;
  x2 = width * 0.55;
  y2 = height * 0.5;

  // Calculate diagonal of screen
  diag = sqrt(sq(width) + sq(height));

  // Calculate aspeed
  aspeed = amax / rr;

  noStroke();
  noCursor();
}


function draw() {
  // Calculate the mid-point between 2 points
  let mx = (x1 + x2) / 2;
  let my = (y1 + y2) / 2;

  // Store this frame's midpoint
  mids.push({
    x: mx,
    y: my
  });
  // Only ts frames of midpoints
  if (mids.length > ts) mids.shift();


  // Calculate the relative position of 2 points
  let dXY = {
    x: x2 - x1,
    y: y2 - y1
  };
  // Store this frame's relative position
  dxys.push(dXY);
  // Only store ts frames of relative positions
  if (dxys.length > ts) dxys.shift();


  // Fade in
  a += aspeed * adir;

  // If we're all black or all white
  if (a < 0 || a > amax * 2) {
    // Flip color of division
    // When you go to white or black
    flip = !flip;
    a = 0;

    // Calculate average midpoint over time
    amid = {
      x: 0,
      y: 0
    };
    for (let mid of mids) {
      amid.x += mid.x;
      amid.y += mid.y;
    }
    amid.x /= mids.length;
    amid.y /= mids.length;

    // Set-up an object to store the average relative xy position over time
    adxy = {
      x: 0,
      y: 0
    };

    // Calculate the average relative xy position
    for (let dxy of dxys) {
      adxy.x += dXY.x;
      adxy.y += dXY.y;
    }
    adxy.x /= dxys.length;
    adxy.y /= dxys.length;
  }


  // Calculate the average angle
  let angle = atan(adxy.y / adxy.x);

  // Draw the background
  background(flip ? 255 : 0);

  // Rotate the canvas to that angle
  // to draw the dividing rectangle
  push();
  translate(amid.x, amid.y);
  rotate(angle);
  // Draw the xy division
  // If flip, then this one is ahead
  fill(flip ? 0 : 255, a);
  rect(0, -diag / 2, diag, diag);
  // If flip, then this one is behind
  pop();
  fill(flip ? 0 : 255, a - amax);
  rect(0, 0, width, height);


  // Draw the people
  fill('red');
  ellipse(x1, y1, 10, 10);
  ellipse(x2, y2, 10, 10);
  // Draw the midpoint
  // fill('blue');
  // ellipse(mx, my, 20, 20);

  if (auto1) {
    x1+=xspeed1;
    y1+=yspeed1;
  }

  if (auto2) {
    x2+=xspeed2;
    y2+=yspeed2;
  }


}

function keyPressed() {
  switch (key) {
    case '1':
      auto1 = !auto1;
      xspeed1 = random(-2, 2);
      yspeed1 = random(-2, 2);
      break;
    case '2':
      auto2 = !auto2;
      xspeed2 = random(-2, 2);
      yspeed2 = random(-2, 2);
      break;
  }
}

// Move the closest point with the mouse
// mouse is being dragged
function mouseDragged() {
  let d1 = dist(mouseX, mouseY, x1, y1);
  let d2 = dist(mouseX, mouseY, x2, y2);
  if (d1 < d2) {
    x1 = mouseX;
    y1 = mouseY;
  } else {
    x2 = mouseX;
    y2 = mouseY;
  }
}
