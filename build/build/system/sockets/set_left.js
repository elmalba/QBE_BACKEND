"use strict";

//Nodos = require("../nodos.js");

module.exports = function (qbe, data, socket) {
  //console.log(qbe);

  console.log("TOQUE ", data);

  data = +data;
  var cadenas = qbe.game.cadenas;

  if (+data != 0) {
    var left = qbe.game.qbes[data - 1];
    left.right = qbe;
    qbe.left = left;
    //qbe.game.cadenas[+qbe.nodo] = null;
    //console.log("TOKE CADENA", cadenas);
    qbe.game.check();
  } else {
    cadenas[qbe.nodo] = qbe;
    if (qbe.right) {
      qbe.right.left = null;
      qbe.right = null;
    }
    /* if (qbe.left) {
       qbe.left.rigth = null;
       qbe.left = null;
     }*/
  }

  var writeBuffer = Buffer(2);
  writeBuffer[0] = 63;
  writeBuffer[1] = 126;
  //socket.write(writeBuffer);
};