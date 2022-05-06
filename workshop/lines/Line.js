class Line {
  constructor(start, vel) {
    if(start && vel) this.set(start, vel);
  }

  shuffle() {
    // Pick random start point
    let s = pickRandomSide(-1);
    this.start = getRandomPointOnSide(s);

    // Pick random end point (on a different side)
    s = pickRandomSide(s);
    let end = getRandomPointOnSide(s);
    this.vel = p5.Vector.sub(end, this.start).normalize().mult(speed);

    this.init();

  }

  set(start, vel) {
    this.start = start;
    this.vel = vel;
    this.init();
  }

  init() {
    this.current = this.start.copy();

    // Set stage
    this.play = false;
    this.show = true;

    // Initialize graphics buffer
    this.graphic = createGraphics(width, height);
  }

  set_speed(_speed) {
    this.vel.normalize().mult(_speed)
  }

  run() {
    this.update();
    this.display();
  }

  update() {
    if (offScreen(this.current)) this.play = false;
    if (this.play) {
      this.current.add(this.vel);
      //console.log("UPDATE", this.current.x, this.current.y);
    }
  }

  display() {
    if (this.show) {
      this.graphic.stroke(0);
      this.graphic.strokeWeight(3);
      this.graphic.line(this.start.x, this.start.y, this.current.x, this.current.y);
      //console.log(this.start, this.current);
      // Draw buffer to canvas

    } else {
      console.log("CLEARING");
      this.graphic.clear();

    }
    image(this.graphic, 0, 0);
  }

  toggle_show(show) {
    this.show = show || !this.show;
    this.play = this.show;
    console.log("SHOW", this.show);
  }

  toggle_play(play) {
    this.play = play || !this.play;
    console.log("PLAY", this.play);
  }

}

function offScreen(pos) {
  return pos.x < 0 || pos.x > width || pos.y < 0 || pos.y > height;
}

// Pick a random side
function pickRandomSide(_s) {
  let s = floor(random(4))
  if (s == _s) {
    pickRandomSide(_s);
  }
  return s;
}

// Get a random point from a side
function getRandomPointOnSide(s) {
  // Return the side
  function side() {
    return s % 2;
  }

  let edges = [
    [side, Math.random],
    [side, Math.random],
    [Math.random, side],
    [Math.random, side],
  ];
  return createVector(edges[s][0]() * width, edges[s][1]() * height);
}
