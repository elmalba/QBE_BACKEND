var net = require("net");
QBE = require("./qbe.js");
const HOST = "0.0.0.0";
const PORT = 12001;

const create_sockets_nodes = (game, nodos, cadenas, cantidad_nodos) => {
  return new Promise((resolve, reject) => {
    for (let ix = 0; ix < cantidad_nodos; ++ix) {
      let nodo = new QBE(game,nodos, ix);
      // nodo.set_number(1);
      //nodo.warning();

      // nodo.print_screen();

      nodos[ix] = nodo;

      cadenas[ix] = true;

      net
        .createServer(function(sock) {
          nodo.set_socket(sock);
          console.log(
            "CONNECTED: " + sock.remoteAddress + ":" + sock.remotePort
          );

          console.log("ACA");

          // We have a connection - a socket object is assigned to the connection automatically

          // Add a 'data' event handler to this instance of socket

          // Add a 'close' event handler to this instance of socket
          sock.on("close", function(data) {
            console.log(
              "CLOSED: " + sock.remoteAddress + " " + sock.remotePort
            );
          });
        })
        .listen(+(PORT + +ix), HOST);
      console.log("Conexion lista para " + HOST + ":" + (PORT + +ix));
    }
    resolve([nodos, cadenas]);
  });
};

module.exports = create_sockets_nodes;
