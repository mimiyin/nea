// Use keys 1-5

const NUM_LINES = 5;

// Toggle sets
const TOGGLE_SETS = [
  ['1', '2', '3', '4', '5'],
  ['q', 'w', 'e', 'r', 't'],
  ['a', 's', 'd', 'f', 'g'],
  ['z', 'x', 'c', 'v', 'b']
]
// Set indices
const PLAY_PAUSE = 0;
const SHOW_HIDE = 1;
const INIT = 2;
const SPEED = 3;

// Lines
let speed = 0.1;
let lines = [];

// Manually setting lines
let m_start, m_vel;

// Global settings
let show = true;
let play = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  init();
}

function draw() {
  background(255);
  for (let line of lines) {
    line.run();
  }
  textSize(16);
  text(nfs(speed, 0, 1), 10, 30);
}

function init() {
  for (let l = 0; l < NUM_LINES; l++) {
    lines[l] = new Line();
  }
}

function keyPressed() {
  // Which key set?
  let mode = -1;
  let num = -1;;
  for (let t in TOGGLE_SETS) {
    let toggle_set = TOGGLE_SETS[t];
    let ind = toggle_set.indexOf(key);
    if (ind >= 0) {
      mode = parseInt(t);
      num = ind;
      break;
    }
  }
  // Try the numbers
  if (num >= 0) {
    switch (mode) {
      case PLAY_PAUSE:
        console.log("PLAY", num);
        lines[num].toggle_play();
        break;
      case SHOW_HIDE:
        console.log("SHOW", num);
        lines[num].toggle_show();
        break;
      case INIT:
        console.log("INIT", num);
        lines[num].shuffle();
        break;
      case SPEED:
        console.log("SPEED", num);
        lines[num].set_speed(speed);
        break;
    }
    return;
  }

  switch (keyCode) {
    case 32:
      go = !go;
      break;
    case 'm':
      manual = !manual;
    case DELETE:
      show = !show;
      for (let line of lines) line.toggle_show(show);
      break;
    case ENTER:
      play = !play;
      for (let line of lines) line.toggle_play(play);
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

function mousePressed() {
  let dists = [mouseX, width - mouseX, mouseY, height - mouseY];
  let min = Math.min(...dists);
  let s = dists.indexOf(min);
  m_start = s < 2 ? createVector(s * width, mouseY) : createVector(mouseX, s * height);
}

function mouseReleased() {
  let target = createVector(mouseX, mouseY);
  m_vel = p5.Vector.sub(target, m_start);
}
