Nodos = require("../../system/nodos");
module.exports = () => {
  qbes = Nodos.get_all();
  for (let ix in  qbes) {
      let qbe= qbes[ix]
     qbe.set_gif(`games/example/gif/${+ix+1}.gif`);
  }

  console.log("GAME READY !!")
};
