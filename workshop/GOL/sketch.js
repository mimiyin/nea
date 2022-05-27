// KEYS
// SPACE = REGENERATE
// D = DISPLAY
// 1,2,3,4 = PRESET DENSITIES
// UP, DOWN = FADING SPEED
// LEFT, RIGHT = JUMP PRESENT DENSITIES
// A = AUTO VS. MANUAL (AUTO MEANS WEIGHTED RANDOM)

let w, h, columns, rows, board, pboard, next;
let auto = true;
let fadeIn = 0;
let fadeOut = 255;
let generateInverval = 300;
let seedWeights = [0, 10, 20, 50, 20]; // DENSITY WEIGHT, IGNORE FIRST '0'
let weights = [];
let densities = [0.05, 0.1, 0.5, 0.75]; // DENSITY PRESET
let di = 2; // CHANGE STARTING DENSITY HERE
let density = densities[di];
let num = 5;
let whiteSquareCount;
let debug = false;

function setup() {
  tWeight = 0;
  for (i = 0; i < seedWeights.length; i++) {
    tWeight = tWeight + seedWeights[i];
    weights.push(tWeight);
  }

  noStroke();
  createCanvas(windowWidth, windowHeight);
  background(0);
  w = windowWidth / num;
  h = windowHeight / num;
  // Calculate columns and rows
  columns = num + 2;
  rows = num + 2;
  // Wacky way to make a 2D array is JS
  board = new Array(columns);
  for (let i = 0; i < columns; i++) {
    board[i] = new Array(rows);
  }
  // Going to use multiple 2D arrays and swap them
  next = new Array(columns);
  for (i = 0; i < columns; i++) {
    next[i] = new Array(rows);
  }
  init();
}

function draw() {
  // background(255);
  push();
  translate(-w, -h);

  if (frameCount % generateInverval == 0) {
    fadeIn = 0;
    fadeOut = 255;
    pboard = board;
    generate();
  }

  // draw new board
  changeCount = 0;
  if (pboard) {
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        if (pboard[i][j] == board[i][j] && pboard[i][j] == 1) {
          // if both are white
          fill(255);
        } else if (pboard[i][j] != board[i][j] && pboard[i][j] == 1) {
          // if it used to be white
          fill(fadeOut);
          changeCount++;
        } else if (pboard[i][j] != board[i][j] && pboard[i][j] == 0) {
          // if it used to be black
          fill(fadeIn);
          changeCount++;
        } else {
          // if both are black
          fill(0);
        }
        noStroke();
        rect(i * w, j * h, w, h);
      }
    }
    if (auto && changeCount == 0) {
      autoDrive();
    }
  } else {
    // first board
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        if (board[i][j] == 1) {
          fill(fadeIn);
        } else {
          fill(0);
        }
        noStroke();
        rect(i * w, j * h, w, h);
      }
    }
  }
  fadeIn += 1 * (600 / generateInverval);
  fadeOut -= 1 * (600 / generateInverval);
  pop();
  if (debug) {
    fill(255, 0, 0);
    textSize(height / 75);
    textAlign(RIGHT, BOTTOM);
    text("auto:" + auto + "    speed:" + generateInverval + "   density:" + density, width, height);
    // text("speed:" + generateInverval, w, height + h);
    // text("   density:" + density, w, height + h);
    // text("auto:" + auto,  w, height + h);
    // text("speed:" + generateInverval, w, height + h);
    // text("density:" + density, w, height + h);
  }
}

function autoDrive() {
  r = random(100);
  for (i = 0; i < weights.length; i++) {
    if (r > weights[i] && r < weights[i + 1]) {
      density = densities[i];
    }
  }
  init();
}

// Fill board randomly
function init() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      // Lining the edges with 0s
      if (i == 0 || j == 0 || i == columns - 1 || j == rows - 1)
        board[i][j] = 0;
      // Filling the rest randomly
      else board[i][j] = random(1) <= density ? 1 : 0;
      next[i][j] = 0;
    }
  }
}

// The process of creating the new generation
function generate() {
  console.log("generate");
  // Loop through every spot in our 2D array and check spots neighbors
  for (let x = 1; x < columns - 1; x++) {
    for (let y = 1; y < rows - 1; y++) {
      // Add up all the states in a 3x3 surrounding grid
      let neighbors = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          neighbors += board[x + i][y + j];
        }
      }

      // A little trick to subtract the current cell's state since
      // we added it in the above loop
      neighbors -= board[x][y];
      // Rules of Life
      if (board[x][y] == 1 && neighbors < 2) next[x][y] = 0;
      // Loneliness
      else if (board[x][y] == 1 && neighbors > 3) next[x][y] = 0;
      // Overpopulation
      else if (board[x][y] == 0 && neighbors == 3) next[x][y] = 1;
      // Reproduction
      else next[x][y] = board[x][y]; // Stasis
    }
  }

  // Swap!
  let temp = board;
  board = next;
  next = temp;
}

function keyPressed() {
  // if user presses 1, decrease generate interval by 50 until it reaches 300, if user presses 2, increase generate interval by 50 until it reaches 900

  if (key == "1") {
    density = densities[0];
  } else if (key == "2") {
    density = densities[1];
  } else if (key == "3") {
    density = densities[2];
  } else if (key == "4") {
    density = densities[3];
  } else if (keyCode == UP_ARROW) {
    generateInverval += 50;
  } else if (keyCode == DOWN_ARROW) {
    generateInverval -= 50;
  } else if (keyCode == LEFT_ARROW) {
    if (di > 0) {
      di--;
    }
    density = densities[di];
  } else if (keyCode == RIGHT_ARROW) {
    if (di < densities.length - 1) {
      di++;
    }
    density = densities[di];
  }

  switch (keyCode) {
    case 32:
      init();
      break;
    case SHIFT:
      debug = !debug;
      break;
    case ENTER:
      auto = !auto;
      break;
  }

  // Turn off auto if trying to do anything else
  if(keyCode != ENTER) auto = false;

  generateInverval = constrain(generateInverval, 60, 900);
  // density = constrain(density, 0, 1);

  console.log("current generation interval: " + generateInverval);
  console.log("current speed: " + density);
}
