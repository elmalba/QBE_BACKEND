Nodos = require("../../system/nodos");
/* JUEGO PARA MARCO*/
changes = (qbe)=>{


//   fun = (ix)=>{

//                 ix = ix % 8;

//                 if (ix < 7) qbe.set_gif(`games/example/gif/${+ix + 1}.gif`);
//                 else if (ix == 7) qbe.success();
//                 else if (ix == 8) qbe.error();
//                 else if (ix == 9) qbe.warning();
                
//                 setTimeout(fun, 10000, ix + 1);
//               }

//  setTimeout(fun, 1000, 0);


}

/*  fin */
module.exports = () => {
  qbes = Nodos.get_all();
  for (let ix in  qbes) {
      let qbe= qbes[ix]
     qbe.set_gif(`games/example/gif/${+ix+1}.gif`);

  }

  changes(qbes[1]);



  console.log("GAME READY !!")
};
