Nodos = require("../nodos.js");
module.exports = function(qbe, data, socket) {
  console.log(qbe.nodo,+data);
  //console.log(Nodos);
  data = (+data);
  let cadenas = Nodos.get_cadenas_all();
  if (+data != 0) {
    let left = qbe.nodos[data - 1];
    left.rigth = qbe;
    qbe.left = left;
    cadenas[qbe.nodo - 1] = false;
  } else {
    cadenas[qbe.nodo - 1] = true;
    if (qbe.rigth) {
      qbe.rigth.left = null;
      qbe.rigth = null;
    }
    if (qbe.left) {
      qbe.left.rigth = null;
      qbe.left = null;
    }
  }
  qbe.game.check();
  var writeBuffer = Buffer(2);
  writeBuffer[0] = 63;
  writeBuffer[1] = 126
  //socket.write(writeBuffer);
};
