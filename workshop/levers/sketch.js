// IS THERE A DIFFERENCE?

let locs = [];
let mode = 1;
let variable_time = false;


const TOTAL_RANDOM = 0;
const REPEATING_RANDOM = 1;
const SEQUENCED_RANDOM = 2;
const COMPOSED = 3;

// Sequencing
let seq = [0, 0, 0, 0, 4, 4, 4];
seq = [0, 2, 2, 0, 2, 4, 3];
let comp = [0, 1, 1, 0, 1, 1, 0, 1, 1];
comp = [0, 1, 1, 0, 1, 0, 1, 2, 3, 4, 0, 1, 1, 0, 1, 1, 0, 1, 2, 3, 4, 5];

let c = -1;
let s = -1;

let loc;
let sz = 20;
let a = 0;
let interval = 60;
let aspeed = 255 / interval;
let count = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  randomSeed(0);

  switch (mode) {
    case COMPOSED:
      position_manual();
      break;
    default:
      position_random();
      break;
  }
}

function draw() {
  background(0);
  if (count == interval) {
    switch (mode) {
      case TOTAL_RANDOM:
        loc = { x: random(width), y: random(height) };
        break;
      case REPEATING_RANDOM:
        loc = random(locs);
        break;
      case SEQUENCED_RANDOM:
        s++;
        s %= seq.length;
        loc = locs[seq[s]];
        break;
      case COMPOSED:
        c++;
        c %= comp.length;
        loc = locs[comp[c]];
        break;
    }

    // Variable timing
    if (variable_time) {
      interval = floor(floor(random(1,3)) * 60);
      aspeed = 255 / interval;
    }

    // Reset
    a = 0;
    count = 0;
  }
  fill(255, a);
  if (loc) rect(loc.x, loc.y, sz, sz);

  // Progress
  a += aspeed;
  count++;
}

function position_random() {
  for (let i = 0; i < 6; i++) {
    locs.push({ x: random(width), y: random(height) });
  }
}

function position_manual() {
  locs.push({ x: 0, y: 0 });
  locs.push({ x: sz, y: 0 });
  locs.push({ x: 0.5 * width - 0.5 * sz, y: 0.5 * height - 0.5 * sz });
  locs.push({ x: 0.9 * width, y: 0.9 * height });
  locs.push({ x: 0.67 * width, y: 0.5 * height });
  // locs.push({ x: 0.3*width, y: 0.47*height });
  // locs.push({ x: 0.6*width, y: 0.25*height });
  locs.push({ x: 0.73 * width, y: 0.4 * height });
}
