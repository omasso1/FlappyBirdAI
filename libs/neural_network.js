let Neural_network_wczytaj = 5;

function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

function dsigmoid(y) {
  return y * (1 - y);
}
class Neural_network {
  constructor(i, h, o) {
    if (i instanceof Neural_network) {
      this.input_nodes = i.input_nodes;
      this.hidden_nodes = i.hidden_nodes;
      this.output_nodes = i.output_nodes;

      this.ih = i.ih.copy();
      this.ho = i.ho.copy();

      this.ih_bias = i.ih_bias.copy();
      this.ho_bias = i.ho_bias.copy();
      this.learning_rate = 0.1;
    } else {
      this.input_nodes = i;
      this.hidden_nodes = h;
      this.output_nodes = o;

      this.ih = new Matrix(this.hidden_nodes, this.input_nodes);
      this.ih.randomize();

      this.ho = new Matrix(this.output_nodes, this.hidden_nodes);
      this.ho.randomize();

      this.ih_bias = new Matrix(h, 1);
      this.ih_bias.randomize();

      this.ho_bias = new Matrix(o, 1);
      this.ho_bias.randomize();
      this.learning_rate = 0.1;
    }
  }

  copy() {
    return new Neural_network(this);
  }
  predict(n) {
    let input = Matrix.fromArray(n);

    let hidden = Matrix.multiply(this.ih, input);
    //console.log(hidden);
    //console.log(this.h_bias);
    hidden.add(this.ih_bias);
    hidden.map(sigmoid);

    let output = Matrix.multiply(this.ho, hidden);
    //console.log(output);

    output.add(this.ho_bias);
    output.map(sigmoid);
    return output.toArray();
  }

  train(input_array, target_array) {
    let inputs = Matrix.fromArray(input_array);

    let hidden = Matrix.multiply(this.ih, inputs);

    hidden.add(this.ih_bias);
    hidden.map(sigmoid);

    let output = Matrix.multiply(this.ho, hidden);


    output.add(this.ho_bias);
    output.map(sigmoid);

    let targets = Matrix.fromArray(target_array);

    //Policzenie bledu na wyjsciu
    let o_error = Matrix.subtract(targets, output);

    //Liczenie "nachylenia"
    let gradient_o = Matrix.map(output, dsigmoid);
    gradient_o.multiply(o_error);
    gradient_o.multiply(this.learning_rate);


    //Policzenie zmiany w wagach

    let hidden_T = Matrix.transpose(hidden);
    let ho_delta = Matrix.multiply(gradient_o, hidden_T);

    //Zmiana wag
    this.ho.add(ho_delta);
    this.ho_bias.add(gradient_o);

    //liczenie bledu w "ukrytych" neuronach
    let ho_T = Matrix.transpose(this.ho);
    let hidden_error = Matrix.multiply(ho_T, o_error);
    let gradient_h = Matrix.map(hidden, dsigmoid);
    gradient_h.multiply(hidden_error);
    gradient_h.multiply(this.learning_rate);

    //Policzenie zmian
    let inputs_T = Matrix.transpose(inputs);
    let ih_delta = Matrix.multiply(gradient_h, inputs_T);

    //Zmiana wag
    this.ih.add(ih_delta);
    this.ih_bias.add(gradient_h);
  }
  mutate(func) {
    this.ih.map(func);
    this.ho.map(func);
    this.ih_bias.map(func);
    this.ho_bias.map(func);
  }

  zapisz() {
    return JSON.stringify(this);
  }

  zapisz_do_pliku() {
    saveJSON(this.zapisz(), "Neural_network.json")
  }
  static wczytaj(data) {
    if (typeof data == 'string') {
      data = JSON.parse(data);
    }
    let nowy = new Neural_network(data.input_nodes, data.hidden_nodes, data.output_nodes);
    nowy.weights_ih = Matrix.deserialize(data.ih);
    nowy.weights_ho = Matrix.deserialize(data.ho);
    nowy.ih_bias = Matrix.deserialize(data.ih_bias);
    nowy.ho_bias = Matrix.deserialize(data.ho_bias);
    nowy.learning_rate = data.learning_rate;
    return nowy;
  }

  static wczytaj_z_pliku(nazwa) {

    //console.log((loadJSON(nazwa)));
    loadJSON(nazwa, "json", function(data) {

      if (typeof data == 'string') {
        data = JSON.parse(data);
      }
      Neural_network_wczytaj = new Neural_network(data.input_nodes, data.hidden_nodes, data.output_nodes);
      Neural_network_wczytaj.weights_ih = Matrix.deserialize(data.ih);
      Neural_network_wczytaj.weights_ho = Matrix.deserialize(data.ho);
      Neural_network_wczytaj.ih_bias = Matrix.deserialize(data.ih_bias);
      Neural_network_wczytaj.ho_bias = Matrix.deserialize(data.ho_bias);
      Neural_network_wczytaj.learning_rate = data.learning_rate;
    });
  }

}

function toStr(str) {
  let string = '';
  let i = 0;
  while (str[i] != undefined) {
    string += str[i];
    i++;
  }
  console.log(string);
  return string;
}