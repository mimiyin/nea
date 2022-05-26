class Thumb {
  constructor(threshold) {
    // AudioPlayer
    // Who do I send the sound to?
    // Set the random range
    //%age of fast - low and high
    //%age of slow - low and high
    //%age of medium - low and high
    this.th = threshold;
    this.y = SLIDER_Y;
    this.dragging = false;

    this.init();
  }

  run(low, high) {
    if(this.dragging) this.setThreshold(low, high);

    // Draw the thumb
    this.display();

  }

  init() {
    this.x = SLIDER_XL + (SLIDER_W * this.th);
    this.xl = this.x - (THUMB_SZ / 2);
    this.xr = this.xl + THUMB_SZ;
    this.yt = this.y - (THUMB_SZ / 2);
    this.yb = this.yt + THUMB_SZ;
  }

  grabbed() {
    return mouseIsPressed && mouseX > this.xl && mouseX < this.xr && mouseY > this.yt && mouseY < this.yb;
  }

  setState(state) {
    this.dragging = state;
  }

  setThreshold(low, high) {
    this.th = (mouseX - SLIDER_XL) / SLIDER_W;
    this.th = constrain(this.th, low, high);
    this.init();
  }

  getThreshold() {
    return this.th;
  }

  display() {
    fill(0);
    rect(this.x, this.y, THUMB_SZ, THUMB_SZ);
    textSize(12);
    textAlign(CENTER, CENTER);
    text(nfs(this.th, 0, 2), this.x, this.y + THUMB_SZ);

  }
}
