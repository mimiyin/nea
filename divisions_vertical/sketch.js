// Position of 2 people
let x1, y1, x2, y2;

// Average midpoints
let mids = [];

// Average midpoint over time
let avgMid;


// Diag of canvas
let diag = 0;

// Refresh rate in seconds
let rr = 60 * 1;
// Smoothing timespan in seconds
let ts = 60 * 5

// Alpha - How quickly we fade in
// Second number represents multiplier of rr for fadein time
let amax = 255 * 1;
let a = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Start off on a diagonal
  x1 = width * 0.95;
  y1 = height * 0.45;
  x2 = width * 0.95;
  y2 = height * 0.55;

  // Calculate diagonal of screen
  diag = sqrt(sq(width) + sq(height));


  // Set aspeed
  a = amax / rr;
  
  // Draw background once
  background(0);

  // No stroke
  noStroke();
}


function draw() {
  // Calculate the mid-point between 2 points
  let midX = (x1 + x2) / 2;
  let midY = (y1 + y2) / 2;

  // Store this frame's midpoint
  mids.push({
    x: midX,
    y: midY
  });
  // Only keep them for so long
  if (mids.length > ts) mids.shift();
	
  // Re-average
  if (frameCount % rr == 1) {
    avgMid = {
      x: 0,
      y: 0
    };
    for (let mid of mids) {
      avgMid.x += mid.x;
      avgMid.y += mid.y;
    }
    avgMid.x /= mids.length;
    avgMid.y /= mids.length;
  }


  // Draw the vertical division
  fill(255, a);
  rect(avgMid.x, 0, width - avgMid.x, height);
  fill(0, a);
  rect(0, 0, avgMid.x, height);

  fill('red');
  // Draw the people
  ellipse(x1, y1, 10, 10);
  ellipse(x2, y2, 10, 10);
  // Draw the midpoint
  ellipse(midX, midY, 20, 20);

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