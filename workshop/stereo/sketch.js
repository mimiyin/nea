// Use keys 1-5
const THUMB_SZ = 20;
const SLIDER_W = 450;
const SLIDER_XL = 100;
const SLIDER_XR = SLIDER_XL + SLIDER_W;
const SLIDER_Y = 100;
const INPUT_M = 200;
let panner;
let ths = [0.1, 0.5, 1];
let thumbs = [];
let paces = ["Fast", "Medium", "Slow"];
let pace;
let side;
let click;


// Set tempo ranges
let tempos = [
  [100, 1000],
  [1000, 5000],
  [5000, 20000]
];
let inputs = [];

// Current delay
let delay = 100;
let ts = 1;


function preload() {
  click = loadSound('click.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER, CENTER);
  init();
}

function init() {

  // Initialize PANNER
  panner = createSlider(0, 1, 0.5, 0.05);

  // Initialize the thumbs
  for (let th of ths) {
    thumbs.push(new Thumb(th));
  }

  // Input fields
  for (let t in tempos) {
    let tempo = tempos[t];
    let low = createInput(tempo[0]);
    let x = t * INPUT_M + 100;
    let high = createInput(tempo[1]);
    low.position(x, 175);
    high.position(x, 200);
    low.input(function() {
      tempos[t][0] = this.value;
    });
    high.input(function() {
      tempos[t][1] = this.value;
    });
    inputs.push([low, high]);
  }
}

function draw() {
  background(255);

  // Draw the slider and run the thumbs
  line(SLIDER_XL, SLIDER_Y, SLIDER_XR, SLIDER_Y);
  for (let t = 0; t < thumbs.length; t++) {
    let low = t > 0 ? thumbs[t-1].getThreshold() + 0.05 : 0;
    let high = t < thumbs.length - 1 ? thumbs[t+1].getThreshold() - 0.05 : 1;
    let thumb = thumbs[t];
    thumb.run(low, high);
  }

  // Pick a

  if (delay && ts) {
    let now = millis();
    if (now - ts >= delay) {
      // Replace with left/right logic
      //sound.play();
      ts = now;

      // Pick a side
      side = random(1) < panner.value() ? -1 : 1;
      click.pan(side);
      click.play();

      // Pick a new threshold
      let r = random(1);
      delay = undefined;
      for(let t in thumbs) {
        let thumb = thumbs[t];
        let th = thumb.getThreshold();
        if(r < th) {
          let low = tempos[t][0];
          let high = tempos[t][1];
          delay = random(low, high);
          pace = t;
          console.log(pace, low, high, delay);
          break;
        }
      }
    }
  }

  textAlign(LEFT, CENTER);
  textSize(16);
  text("Pan TH: " + nfs(panner.value(), 0, 2), 650, 185);
  text("Pace: " + paces[pace] + "\tDelay: " + floor(delay/1000) + "\tCount: " + floor((floor(millis()/1000) - ts/1000)), 100, 300);
  textSize(36);
  text(side, 650, 300);
}

function mousePressed() {
  for (let thumb of thumbs) {
    if (thumb.grabbed()) {
      thumb.setState(true);
    }
  }
}

// Release all thumbs
function mouseReleased() {
  for (let thumb of thumbs) {
    thumb.setState(false);
  }
}

function keyPressed() {
  click.play();
  click.stop();
}
