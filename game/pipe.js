class Pipe {
  constructor() {
    this.poz_x = width + 150;
    this.width = 100;
    this.space = 120;
    this.bottom = random(floor(height - this.space)) + this.space;
    this.top = this.bottom - this.space;
  }

  show() {
    rect(this.poz_x, this.bottom, this.width, height);
    rect(this.poz_x, this.top, this.width, -height);
  }

  update() {
    this.poz_x -= 5;
  }

  outOfCanvas() {
    if (this.poz_x < -this.width) return true;
    else return false;
  }

}