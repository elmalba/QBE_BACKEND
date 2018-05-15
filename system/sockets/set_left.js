Nodos = require("../nodos.js")
module.exports = function (qbe, data, socket){

  //console.log(+data);
  //console.log(Nodos);
   let cadenas = Nodos.get_cadenas_all();
  

   
  let left =qbe.nodos[data-1]
  left.rigth = qbe;
  qbe.left = left
  cadenas[qbe.nodo - 1] = false;



  //console.log("check",qbe.nodos);
  //console.log("cadenas", nodos.get_cadenas());
  qbe.game.check();

  socket.write(`00`);
};
