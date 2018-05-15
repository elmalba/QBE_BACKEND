const numbers = require("./qbe/numbers");
const error = require("./qbe/error");
const initial = require("./qbe/initial");
const warning = require("./qbe/warning");
const success = require("./qbe/success");
const chalk = require("chalk");
const sockets = require("./sockets/router");
const getPixels = require("get-pixels");
const log = console.log;

class QBE {
  constructor(game, nodes, node) {
    this.nodo = node;
    ++this.nodo;
    this.nodos = nodes
    this.socket = null;
    this.matrix = [initial];
    this.game = game;
    this.times = [];
    this.left = null;
    this.rigth = null;
  }
  set_references(nodos) {
    this.nodos = nodos;
  }

  set_socket(socket) {
    //this.socket = socket;

    socket.on("data", data => {
      // try {
        let option = `${String.fromCharCode(data[0])}${String.fromCharCode(
          data[1]
        )}`;
        if (sockets[option] == undefined) {
          socket.write("-1");
          return;
        } else {
              data = "" + data;
              data = data.substr(1);
              data = data.substr(1);

          sockets[option](this, data, socket);
        }
    //  } catch (error) {
    //    socket.write("-2");
    //  }
    });
  }

  sayHello() {
    console.log("Hello, my name is " + this.name + ", I have ID: " + this.id);
  }

  receive() {
    sock.on("data", function(data) {
      console.log("DATA " + sock.remoteAddress + ": " + data);
      // Write the data back to the socket, the client will receive it as data from the server
      //sock.write('You said "' + data + '"');
    });
  }

  set_figure(figure) {}
  set_number(number) {
    this.matrix = [numbers[number]];
    this.time = [4];
  }

  set_gif(path) {
    getPixels(path, (err, pixels) => {
      if (err) {
        console.log("Bad image path");
        return;
      }

      let out = [];

      //console.log(pixels.data.length)
      let ixx = 0;
      for (let jx = 0; jx < 8; ++jx) {
        let in_out = new Array(8);
        for (let ix = 0; ix < 8; ++ix) {
          in_out[ix] = [
            pixels.data[ixx],
            pixels.data[ixx + 1],
            pixels.data[ixx + 2]
          ];
          ixx = ixx + 4;
        }
        out.push(in_out);
      }
      //console.log(out);
      this.matrix = [out];
      this.time = [0];
    });
  }

  compare_gif(path) {
    return new Promise((resolve, reject) => {
      getPixels(path, (err, pixels) => {
        if (err) {
          console.log("Bad image path");
          resolve(false);
          return;
        }

        let matrix = this.matrix[0];
        let ixx = 0;
        for (let ix = 0; ix < 8; ++ix) {
          for (let jx = 0; jx < 8; ++jx) {
            if (matrix[ix][jx][0] != pixels.data[ixx] || matrix[ix][jx][1] != pixels.data[+ixx + 1] || matrix[ix][jx][2] != pixels.data[+ixx + 2]) {
              //console.log("ERR", matrix[ix][jx][0], pixels.data[ixx], matrix[ix][jx][1], pixels.data[+ixx + 1], matrix[ix][jx][2], pixels.data[+ixx + 2]);
              resolve(false);
            }
            ixx = ixx + 4;
          }
        }
        resolve(true);
      });
    });
  }
  error() {
    this.matrix = [error];
    this.time = [0];
  }
  success() {
    this.matrix = [success];
    this.time = [0];
  }
  warning() {
    this.matrix = [warning];
    this.time = [0];
  }

  print_screen() {
    let out;
    for (let matrix of this.matrix) {
      for (let line of matrix) {
        out = `     `;
        for (let pos of line) {
          out = `${out} ${chalk.rgb(pos[0], pos[1], pos[2])("*")} `;
        }
        console.log(out);
      }
    }
  }
}

module.exports = QBE;
