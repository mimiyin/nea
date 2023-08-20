// KEYS
// SPACE = REGENERATE
// D = DISPLAY
// 1,2,3,4 = PRESET DENSITIES
// UP, DOWN = FADING SPEED
// LEFT, RIGHT = JUMP PRESENT DENSITIES
// A = AUTO VS. MANUAL (AUTO MEANS WEIGHTED RANDOM)

const COLS = 5;
const ROWS = 5;
const COL_W = window.innerWidth / COLS;
const ROW_H = window.innerHeight / ROWS;

let board = [];

function setup() {
  noStroke();
  createCanvas(windowWidth, windowHeight);
  background(0);
  init();
}

function draw() {
  for (let c = 0; c < COLS; c++) {
    let x = c * COL_W;
    for (let r = 0; r < ROWS; r++) {
      let y = r * ROW_H;
      fill(board[c][r] ? 255 : 0);
      rect(x, y, COL_W, ROW_H);
    }
  }
}

function mousePressed() {
  for (let c = 0; c < COLS; c++) {
    let x = c * COL_W;
    for (let r = 0; r < ROWS; r++) {
      let y = r * ROW_H;
      if(mouseX > x && mouseX < x + COL_W && mouseY > y && mouseY < y + ROW_H) {
        board[c][r] = !board[c][r];
      }
    }
  }
}

// Fill board randomly
function init() {
  for (let c = 0; c < COLS; c++) {
    board[c]= [];
    for (let r = 0; r < ROWS; r++) {
      board[c][r] = false;
    }
  }
}



function keyPressed() {
  switch (keyCode) {
    case RETURN:
      //init();
      break;
  }
}
