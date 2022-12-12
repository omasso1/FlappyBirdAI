let birds = [];
let dead_birds = []
const GRAVITY = 0.4;
let pipes = [];
const ILOSC = 300;
let counter = 1;
let slider;
let ilosc_gen = 0;

function setup() {
  createCanvas(640, 540);
  bird = new Bird();
  pipes.push(new Pipe());
  for (let i = 0; i < ILOSC; i++) {
    birds.push(new Bird());
  }
  slider = createSlider(1, 20, 1, 1);
}

function draw() {
  background(51);

  for (let i = 0; i < slider.value(); i++) {
    for (let i = birds.length - 1; i > -1; i--) {
      birds[i].update();
      if (birds[i].hit()) dead_birds.push(birds.splice(i, 1)[0]);
    }

    if (birds.length == 0) {
      nextGeneration();
    }

    for (let i = pipes.length - 1; i > -1; i--) {
      pipes[i].update();
      if (pipes[i].outOfCanvas()) pipes.splice(i, 1);
    }

    if (counter % 90 == 0) {
      pipes.push(new Pipe());
    }

    counter++;
  }
  for (let i = 0; i < birds.length; i++) {
    birds[i].show();
  }
  for (let i = pipes.length - 1; i > -1; i--) {
    pipes[i].show();
  }
}


function keyPressed() {
  if (keyCode == 32) {
    birds[0].jump();
  }
}