module.exports = (qbe, data, socket) => {
  
    qbe.print_screen();
    var writeBuffer = Buffer(255);
    writeBuffer[0] = 255
    writeBuffer[1] = 254;
    writeBuffer[2] = 253;

    console.log(writeBuffer);
      socket.write(writeBuffer);
};
