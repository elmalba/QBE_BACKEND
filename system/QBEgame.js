nodos = require("./nodos")
class Game {
  auto_check(check) {
    this.Check = check;
  }
  check() {
    if (this.Check);
    resolve();
  }
  reset() {
    console.log("RESETEANDO");
    for (let nodo of nodos) {
      nodo.left = null;
      nodo.rigth = null;
    }
    for (let cadena of this.cadenas) {
      cadena = true;
    }

    this.init();
  }
  success() {
    nodos = this.nodos;
    for (let qbe of nodos) qbe.success();

    console.log("MUY BIEN ");
    setTimeout(() => {
      game.reset();
    }, 6000);
  }

  error() {
    nodos = this.nodos;
    for (let qbe of nodos) {
      qbe.error();
    }
    console.log("ERROR");
    setTimeout(() => {
      game.reset();
    }, 6000);
  }

  constructor(game, resolve, nodes) {
    this.Check = false;
    this.nodes = nodes;
    this.cadenas = [];
    this.nodos = [];
    this.resolve = resolve;
    this.init = game;
    nodos.init(this, nodes).then(res => {
      this.nodos = res[0];
      this.cadenas = res[1];
      game();
    });
  }
}
module.exports = Game