// Use keys 1-5

const NUM_LINES = 5;

// Toggle sets
const TOGGLES = ['0', '1', '2', '3', '4', '5'];
// Set indices
const PLAY_PAUSE = 0;

// Lines
let speed = 2;
let lines = [];

// Manually setting lines
let manual = false;
let m_start, m_vel;

// Auto-wrap
let auto = true;

// Global settings
let debug = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  init();
}

function draw() {
  background(255);
  for (let line of lines) {
    line.run();
  }
  if (debug) {
    textSize(24);
    textAlign(RIGHT, BOTTOM);
    fill(255, 0, 0);
    text(nfs("auto: " + auto + "\speed: " + speed, 0, 1), width, height);
  }
}

function init() {
  for (let l = 1; l < NUM_LINES + 1; l++) {
    lines[l] = new Line();
  }

  // Set manual line
  init_man();
}

function init_man() {
  m_start = createVector(width / 4, height);
  m_vel = createVector(1, -1.67).normalize().mult(speed);
  lines[0] = new Line(m_start, m_vel);
  //console.log(lines[0]);
}

function keyPressed() {
  // Which key set?
  for (let t in TOGGLES) {
    let ind = TOGGLES.indexOf(key);
    if (ind >= 0) {
      if (ind == 0) init_man();
      else lines[ind].shuffle();
      lines[ind].toggle_play(true);
      break;
    }
  }

  switch (keyCode) {
    case ENTER:
      auto = !auto;
      break;
    case SHIFT:
      debug = !debug;
      break;
    case UP_ARROW:
      speed--;
      break;
    case DOWN_ARROW:
      speed++;
      break;
    case LEFT_ARROW:
      speed -= 0.1;
      break;
    case RIGHT_ARROW:
      speed += 0.1;
      break;
  }

  // Constrain speed
  speed = constrain(speed, 0.1, 10);
  console.log("SPEED", nfs(speed, 0, 1));
}

// function mousePressed() {
//   if (!manual) return;
//   let dists = [mouseX, width - mouseX, mouseY, height - mouseY];
//   let min = Math.min(...dists);
//   let s = dists.indexOf(min);
//   m_start = s < 2 ? createVector(s * width, mouseY) : createVector(mouseX, s * height);
// }
//
// function mouseReleased() {
//   if (!manual) return;
//   let target = createVector(mouseX, mouseY);
//   m_vel = p5.Vector.sub(target, m_start);
//   // Set the manual line
//   lines[0].set(m_start, m_vel);
// }
