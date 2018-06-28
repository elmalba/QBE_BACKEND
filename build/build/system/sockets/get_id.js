"use strict";

module.exports = function (qbe, data, socket) {
  //console.log("Mi id es  " + qbe.node);
  socket.write("" + qbe.node);
};