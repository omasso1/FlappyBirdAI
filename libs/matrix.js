class Matrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.data = new Array(this.rows).fill().map(() => new Array(this.cols).fill(0));

  }

  map(func) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let val = this.data[i][j];
        this.data[i][j] = func(val, i, j);
      }
    }
    return this;
  }

  static map(a, func) {
    let m = new Matrix(a.rows, a.cols);
    for (let i = 0; i < m.rows; i++) {
      for (let j = 0; j < m.cols; j++) {
        let val = a.data[i][j];
        m.data[i][j] = func(val, i, j);
      }
    }

    return m;
  }


  serialize() {
    return JSON.stringify(this);
  }

  static deserialize(data) {
    if (typeof data == 'string') {
      data = JSON.parse(data);
    }
    let matrix = new Matrix(data.rows, data.cols);
    matrix.data = data.data;
    return matrix;
  }

  randomize() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = Math.random() * 2 - 1;
      }
    }
  }

  print() {
    console.table(this.data);
  }

  add(n) {
    if (n instanceof Matrix) {
      if (this.rows != n.rows || this.cols != n.cols) {
        console.log("Zle wymiary");
      } else
        this.map((e, i, j) => n.data[i][j] + e);
    } else {
      return this.map(val => val + n);
    }
  }

  static add(a, b) {
    if (!(a instanceof Matrix)) {
      console.log('zle argumenty');
      return false;
    } else if (!(b instanceof Matrix)) {
      a.map((e, i, j) => a.data[i][j] + e);
      return a.copy();
    } else {
      if (a.rows != b.rows || a.cols != b.cols) {
        console.log("Zle wymiary");
        return false;
      }
      return a.map((e, i, j) => e + b.data[i][j]).copy();
    }
  }

  subtract(n) {
    if (n instanceof Matrix) {
      if (this.rows != n.rows || this.cols != n.cols)
        console.log("Zle wymiary")
      else
        this.map((e, i, j) => n.data[i][j] - e);
    } else {
      return this.map(val => val - n);
    }
  }

  static subtract(a, b) {
    let m = new Matrix(a.rows, a.cols);
    if (!(a instanceof Matrix)) {
      console.log('zle argumenty');
      return false;
    } else if (!(b instanceof Matrix)) {
      m.map((e, i, j) => m.data[i][j] - e);
      return a.copy();
    } else {
      if (a.rows != b.rows || a.cols != b.cols) {
        console.log("Zle wymiary");
        return false;
      }
      return m.map((e, i, j) => a.data[i][j] - b.data[i][j]);
    }
  }

  multiply(n) {
    if (n instanceof Matrix) {
      if (this.rows !== n.rows || this.cols !== n.cols) {
        console.log('Zle wymiary');
        return false;
      }
      return this.map((e, i, j) => e * n.data[i][j]);
    } else {
      //[i][j]*n
      return this.map(e => e * n);
    }
  }

  static multiply(a, b) {
    if (a instanceof Matrix && b instanceof Matrix) {
      if (a.cols != b.rows) {
        console.log("Zle wymiary");
      } else {
        let m = new Matrix(a.rows, b.cols);
        for (let i = 0; i < m.rows; i++) {
          for (let j = 0; j < m.cols; j++) {
            let sum = 0;
            for (let k = 0; k < a.cols; k++) {
              sum += a.data[i][k] * b.data[k][j];
            }
            m.data[i][j] = sum;
          }
        }
        return m;
      }
    } else {
      console.log("Zle argumenty");
      return 0;
    }
  }

  copy() {
    let m = new Matrix(this.rows, this.cols);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        m.data[i][j] = this.data[i][j];
      }
    }
    return m;
  }


  static transpose(m) {
    return new Matrix(m.cols, m.rows)
      .map((_, i, j) => m.data[j][i]);
  }
  static fromArray(n) {
    return new Matrix(n.length, 1).map((_, i, j) => n[i]);
  }
  toArray() {
    let a = [];
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        a.push(this.data[i][j]);
      }
    }
    return a;
  }

}