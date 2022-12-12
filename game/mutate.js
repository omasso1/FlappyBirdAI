function nextGeneration() {
  reset();
  calculateFitness();
  birds = generate();
  console.log("next gen");
  ilosc_gen++;
}


function reset() {
  pipes = [];
  pipes.push(new Pipe());
  counter = 1;
  birds = [];

}

function generate() {
  let b = [];
  for (let i = 0; i < ILOSC; i++) {
    b.push(poolSelection(dead_birds));
  }
  return b;
}

function calculateFitness() {
  let sum = 0;
  for (let i = 0; i < dead_birds.length; i++) {
    sum += dead_birds[i].score;
  }

  for (let i = 0; i < dead_birds.length; i++) {
    dead_birds[i].fitness = dead_birds[i].score / sum;
  }
}

//WYBRANIE LOSOWO JEDNEGO Z NAJLEPSZYCH
function poolSelection(birds) {
  let index = 0;
  let r = random(1);
  while (r > 0) {
    r -= birds[index].fitness;
    index += 1;
  }
  index -= 1;
  return birds[index].copy();
}