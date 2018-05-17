/*
valor 63 Inicio de cadena 
valor 126 Fin de cadena 
*/
const check_number = num => {
  if (num == 63 || num == 126 ) return num + 1;
  return num;
}
module.exports = (qbe, data, socket) => {
  //qbe.print_screen();
  var writeBuffer = Buffer(194);
  writeBuffer[0] = 63;
  writeBuffer[193] = 126;
  kx = 1;
  for (let ix = 0; ix < 8; ++ix)
    for (let jx = 0; jx < 8; ++jx)
      for (let fx = 0; fx < 3; ++fx) {
        writeBuffer[kx] = check_number(qbe.matrix[0][ix][jx][fx]);
        ++kx;
      }
  socket.write(writeBuffer);
};
