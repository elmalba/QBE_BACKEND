module.exports = (qbe,data,socket) =>{
  //console.log("Mi id es  " + qbe.node);
  socket.write(`${qbe.node}`);
}