function mutate_func(x) {
  if (random(1) < 0.1) {
    let offset = randomGaussian() * 0.5 / ceil(ilosc_gen / 10);
    let newx = x + offset;
    return newx;
  } else {
    return x;
  }
}

class Bird {
  constructor() {
    this.poz_y = height / 2;
    this.force = -7;
    this.vel = 0;
    this.r = 30;
    this.brain = new Neural_network(5, 10, 2);
    this.score = 0;
    this.fitness = 0;
  }

  show() {
    rect(40, this.poz_y, this.r, this.r);
  }

  calculateClosest() {
    if (pipes[0].poz_x + pipes[0].width < 40) {
      if (pipes.length > 1) return pipes[1];
    }
    return pipes[0];
  }

  think() {
    let pipe = this.calculateClosest();
    let output = this.brain.predict([this.poz_y, this.vel, pipe.top, pipe.bottom, pipe.poz_x]);
    if (output[0] > output[1]) this.jump();
  }
  update() {
    this.think();
    this.vel += GRAVITY;
    this.poz_y += this.vel;
    this.score++;
  }


  jump() {
    this.vel = this.force;
  }


  copy() {
    let b = new Bird();
    b.brain = this.brain.copy();
    b.brain.mutate(mutate_func);
    return b;
  }
  hit() {
    //LEWY GORNY
    if (pipes.length > 0) {
      if (pipes[0].poz_x < 40 && pipes[0].poz_x + pipes[0].width > 40) {
        if (this.poz_y > pipes[0].bottom || this.poz_y < pipes[0].top) {
          return true;
        }
      }
      //PRAWY GORNY
      else if (pipes[0].poz_x < 40 + this.r && pipes[0].poz_x + pipes[0].width > 40 + this.r) {
        if (this.poz_y > pipes[0].bottom || this.poz_y < pipes[0].top) {
          return true;
        }
      }
      //LEWY DOLNY
      else if (pipes[0].poz_x < 40 && pipes[0].poz_x + pipes[0].width > 40) {
        if (this.poz_y + this.r > pipes[0].bottom || this.poz_y + this.r < pipes[0].top) {
          return true;
        }
      }
      //PRAWY DOLNY
      else if (pipes[0].poz_x < 40 + this.r && pipes[0].poz_x + pipes[0].width > 40 + this.r) {
        if (this.poz_y + this.r > pipes[0].bottom || this.poz_y + this.r < pipes[0].top) {
          return true;
        }
      }
      //SUFIT I PODLOGA
      if (this.poz_y < 0 || this.poz_y + this.r > height) {
        return true;
      }
    }

    return false;
  }
}