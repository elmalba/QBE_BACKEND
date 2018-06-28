"use strict";

/*
valor 63 Inicio de cadena 
valor 126 Fin de cadena 
*/
var check_number = function check_number(num) {
  if (num == 63 || num == 126) return num + 1;
  return num;
};
module.exports = function (qbe, data, socket) {
  //qbe.print_screen();


  if (qbe.node == 0) {

    //console.log("MATRIX",qbe.matrix[0])
  }

  var writeBuffer = Buffer(194);
  writeBuffer[0] = 63;
  writeBuffer[193] = 126;
  var kx = 1;
  for (var ix = 0; ix < 8; ++ix) {
    for (var jx = 0; jx < 8; ++jx) {
      for (var fx = 0; fx < 3; ++fx) {
        writeBuffer[kx] = check_number(qbe.matrix[0][ix][jx][fx]);
        ++kx;
      }
    }
  }socket.write(writeBuffer);
};