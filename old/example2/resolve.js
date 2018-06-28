Nodos = require("../../system/nodos");
reset = require("./init")
module.exports = async ()=> {
  let cadenas = Nodos.get_cadenas();
  for (let cadena of cadenas) {
    if (cadena.length == 2) {
        let CHECK = true
        all_promise = []
        for ( ixx =0; ixx<2; ++ixx){
            let qbe = cadena[ixx]
            if (!await qbe.compare_gif( `games/example/gif/${+ixx+1}.gif`) ){
                game.error();
            return 
            }
        }
         game.success();
    }
  }
};
