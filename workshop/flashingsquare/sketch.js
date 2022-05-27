// KEYS
// SPACE = PAUSE SKETCH
// D = DISPLAY DEBUG INFO
// 1,2,3,4 = PRESET RATES
// UP, DOWN = JUMP PRESETS
// LEFT, RIGHT = +/- 30 FRAMES
// A = AUTO VS. MANUAL (AUTO MEANS WEIGHTED RANDOM)
// Z, X = OFF/ON
// C = toggle state and pause


let state = true;
let autoState = false;
let num = 5; // division for square
let seedWeights = [0, 15, 20, 30, 20, 15]; // base 100
let weights = [];
let rates = [20, 60, 120, 300, 600]; // frames;
// weights [5, 25, 75, 95, 100];
let rate = rates[2];
let jumpValue = 30;
let pause = false;
let displayed = false;

function setup() {
  tWeight = 0;
  for (i = 0; i < seedWeights.length; i++) {
    tWeight = tWeight + seedWeights[i];
    weights.push(tWeight);
  }

  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  textSize(height / 75);
  frameRate(60);

  w = windowWidth / num;
  h = windowHeight / num;
}

function draw() {
  noStroke();
  fill(255);
  background(0);

  if (autoState) {
    // if on automation
    timeTillChange = frameCountatStart + rate - frameCount;
    if (state) {
      rect(width / 2, height / 2, w, h);
    }
    if (frameCount == frameCountatStart + rate) {
      autoDrive();
    }
  } else {
    // if on manual
    if (state) {
      rect(width / 2, height / 2, w, h);
    }
    if (frameCount % rate == 0) {
      toggle();
    }
    timeTillChange = rate - (frameCount % rate);
  }

  if (displayed) {
    // draw debug line
    stroke(255);
    strokeWeight(3);
    line(0, height * 0.95, width, height * 0.95);

    textAlign(CENTER, TOP);
    for (i = 0; i < rates.length; i++) {
      tempV = map(rates[i], rates[0], rates[rates.length - 1], 0, width);
      rect(tempV, height * 0.95, width / 200, height / 50);
      noStroke();
      text(rates[i], tempV, height * 0.95 + height / 50);
    }

    fill(255, 0, 0);
    tempV = map(rate, rates[0], rates[rates.length - 1], 0, width);
    rect(tempV, height * 0.95, width / 200, height / 50);

    text(rate, tempV, height * 0.95 + height / 50);

    textAlign(RIGHT, BOTTOM);
    text(
      "[a]utomation: " + autoState + "    time till change: " + timeTillChange,
      width, height
    );
  }
}

function displayDebug() {
  displayed = !displayed;
}

function toggle() {
  state = !state;
}

function keyPressed() {
  if (key == "a") {
    autoState = !autoState;
    if (autoState) {
      autoDrive();
    }
  } else {
    autoState = false;
  }

  if (key == "1") {
    rate = rates[0];
  } else if (key == "2") {
    rate = rates[1];
  } else if (key == "3") {
    rate = rates[2];
  } else if (key == "4") {
    rate = rates[3];
  } else if (key == "5") {
    rate = rates[4];
  } else if (keyCode === UP_ARROW) {
    currentIndex = rates.indexOf(rate); //  to check if the rate is a valid number in the array
    if (currentIndex != -1 && currentIndex < rates.length - 1) {
      rate = rates[currentIndex + 1];
      currentIndex = rates.indexOf(rate);
    } else if (currentIndex == -1) {
      // if the rate doesn't match the presets, snap up
      snapUp();
    }
  } else if (keyCode === DOWN_ARROW) {
    currentIndex = rates.indexOf(rate); // to check if the rate is a valid number in the array
    if (currentIndex != -1 && currentIndex > 0) {
      rate = rates[currentIndex - 1];
      currentIndex = rates.indexOf(rate);
    } else if (currentIndex == -1) {
      // if the rate doesn't match the presets, snap down
      snapDown();
    }
  } else if (keyCode === LEFT_ARROW) {
    // slower
    if (rate > rates[0] && rate - jumpValue > rates[0]) {
      rate -= jumpValue;
    } else {
      rate = rates[0];
    }
  } else if (keyCode === RIGHT_ARROW) {
    // faster
    if (rate < rates[rates.length - 1]) {
      rate += jumpValue;
    } else {
      rate = rates[rates.length - 1];
    }
  } else if (key == " ") {
    pause = !pause;
    playPauseSketch();
  } else if (key == "z") {
    pause = false;
    playPauseSketch();
    state = false;
    pause = true;
    playPauseSketch();
  } else if (key == "x") {
    pause = false;
    playPauseSketch();
    state = true;
    pause = true;
    playPauseSketch();
  } else if (key == "c") {
    pause = false;
    playPauseSketch();
    state = !state;
    pause = true;
    playPauseSketch();
  } else if (key == "d") {
    displayDebug();
  }
}

function playPauseSketch() {
  if (!pause) {
    loop();
  } else {
    noLoop();
  }
}

function autoDrive() {
  frameCountatStart = frameCount;
  r = random(100);
  for (i = 0; i < rates.length; i++) {
    if (r > weights[i] && r < weights[i + 1]) {
      state = !state;
      rate = rates[i];
    }
  }
}

function snapUp() {
  for (i = 0; i < rates.length; i++) {
    if (rate > rates[i] && rate < rates[i + 1]) {
      rate = rates[i + 1];
    }
  }
}

function snapDown() {
  for (i = 0; i < rates.length; i++) {
    if (rate > rates[i] && rate < rates[i + 1]) {
      rate = rates[i];
    }
  }
}

// function findClosetIndex() {
//   goal = rate;
//   closest = rates.reduce(function (prev, curr) {
//     return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
//   });
// }
