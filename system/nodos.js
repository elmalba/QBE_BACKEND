const create_sockets_nodes = require("./sockets");
var nodos ;
var cadenas ;
let init = (game,cantidad_nodos) => {
  nodos = new Array(cantidad_nodos);
  cadenas = new Array(cantidad_nodos);
  return create_sockets_nodes(game, nodos, cadenas, cantidad_nodos);
};

let GET_NODO= (ix) =>{
        if ( ix > nodos.length){
            console.log("NODO INEXISTENTE")
            return null
        }
        return nodos[ix]
}

let GET_CADENAS = () => {

    let Cadenas= []
    for(let ix in cadenas){
        let cadena = cadenas[ix]
        let out = []
        if(cadena){
        out.push(nodos[ix]);
        let next = nodos[ix].rigth;
        while(next){
            out.push (next)
            next = next.rigth;
        }
        Cadenas.push(out)
        }
    }
    return Cadenas;

}

module.exports = {
  init: init,
  get: GET_NODO,
  get_cadenas_all: () => {return  cadenas },
  get_cadenas: GET_CADENAS,
  get_all: () => {
    return nodos;
  }
};