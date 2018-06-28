var net = require("net");
// QBE = require("./qbe.js");
const HOST = "0.0.0.0";
const PORT = 12001;

const create_sockets = (sumPORT,Set_socket) => {
  
    //console.log(sumPORT, PORT +sumPORT);
   try {
      net
        .createServer(function(sock) {
          //nodo.set_socket(sock);
          console.log("CONNECTED: " + sock.remoteAddress + ":" + sock.remotePort);
          console.log("NODO : ", sumPORT)
          sock.on("close", function(data) {
            console.log("CLOSED: " + sock.remoteAddress + " " + sock.remotePort);
          });

          sock.on("error", () => console.log("errored"));
          Set_socket(sock);
        })
        .listen(+(PORT + sumPORT), HOST);
      console.log("Conexion lista para " + HOST + ":" + (PORT + sumPORT));
    } catch (error) {}

};

export default create_sockets;
