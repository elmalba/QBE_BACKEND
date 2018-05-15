Nodos = require("../../system/nodos");
reset = require("./init")
error = () => {
    nodos = nodos.get_all();
    for(let qbe of nodos){
        qbe.error()
    }
    console.log("ERROR")
    setTimeout(() => {
        game.reset()
        reset();
    }, 6000);
} 
success = () => {
  nodos = nodos.get_all();
  for (let qbe of nodos) qbe.success();

    console.log("MUY BIEN ");
  setTimeout(() => {
             game.reset();
             reset();
    reset();
  }, 6000);
}; 
module.exports = async ()=> {
  let cadenas = Nodos.get_cadenas();
  for (let cadena of cadenas) {
    if (cadena.length == 6) {
        let CHECK = true
        all_promise = []
        for ( ixx =0; ixx<6; ++ixx){
            let qbe = cadena[ixx]
            if (!await qbe.compare_gif( `games/example/gif/${+ixx+1}.gif`) ){
                error();
            return 
            }
        }
        success();
    }
  }
};
