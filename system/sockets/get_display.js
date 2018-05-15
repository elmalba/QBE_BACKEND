module.exports = (qbe, data, socket) => {
  
    qbe.print_screen();

      socket.write(`${qbe.nodo}`);
};
