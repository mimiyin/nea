/*
Mimi Yin NYU-ITP
Polar Roses
*/

// Store current and previous x,y coordinates
let x, y;
let px, py;
let pos = [];

// Angle
let a;
// Angle speed: How quickly we're circling
let aspeed;

// How quickly we're circling vertically versus horizontally
let yfreq;

// Size of circle (radius)
let range;

// Verticality of circle
let yscl;

// Center of circle
let centerX, centerY;

function setup() {
  createCanvas(windowWidth, windowHeight);

  angle = 0;
  aspeed = 0.001;
  yfreq = 1.2;

  range = width / 2;
  yscl = 1;

  centerX = width / 2;
  centerY = height / 2;

  background(0);
}

function draw() {
  background(0);

  angle += aspeed;

  //Move
  x = cos(angle) * range + centerX;
  y = sin(angle * yfreq) * range * yscl + centerY;

  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  ///////////////////////POLAR ROSES///////////////////////
  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////

  // // Spiral
  // range += 0.1;
  // x = cos(angle)*range + centerX;
  // y = sin(angle*yfreq)*range*yscl + centerY;
  //
  // // Straight line
  // x = cos(angle)*range*cos(angle) + centerX;
  // y = sin(angle*yfreq)*range*yscl*sin(angle) + centerY;
  //
  // // Circular squares
  // x = cos(sin(angle)*angle)*range + centerX;
  // y = sin(cos(angle)*angle*yfreq)*range*yscl + centerY;
  //
  // // Just a circle, sorta
  // x = cos(cos(angle)*angle)*range + centerX;
  // y = sin(cos(angle)*angle*yfreq)*range*yscl + centerY;

  // // Inny - Outy
  //x = cos(sin(angle)*angle)*range*sin(angle)+ centerX;
  //y = sin(cos(angle)*angle*yfreq)*range*yscl*cos(angle)+ centerY;

  // Bigger sweeps with tan
  x = cos(sin(angle) * angle) * range * tan(angle) + centerX;
  y = sin(cos(angle) * angle * yfreq) * range * yscl * tan(angle) + centerY;

  // Traversing by tan()ing centerX
  // Alternating horizontal curves with straight darts
  // x = cos(angle)*range*sin(angle) + centerX*tan(angle);
  // y = sin(cos(angle)*angle*yfreq)*range*yscl*cos(angle) + centerY;



  // Draw line
  //stroke(255);
  //strokeWeight(3);
  noStroke();
  fill(255);
  if (pos.length > 3000) pos.shift();
  pos.push({
    x: x,
    y: y
  });
  //if(px) line(px, py, x, y);

  beginShape();
  for (let p of pos) {
    vertex(p.x, p.y);
  }
  endShape();

  // Remember x,y coordinates for next frame
  //px = x;
  //py = y;

  //aspeed = map(mouseX, 0, width, 0, 0.1);

}