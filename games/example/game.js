import Game from  "../../system/game";

export default class Example extends Game{
    constructor(){
        //this.nodos = 6  // por defecto inicia 6 qbe
        // this.auto_check = false // default = TRUE
      
        super();
        this.name = "Ordenar Menor a  Mayor";
        this.description = "Juego Ejemplo para crear más juegos";
        this.instructions = "Este juego consiste en ordernar los QBE según sus numeros en pantalla de menor a mayor";
    }
    start(){
          let qbes = this.qbes;
          for (let ix in qbes) {
            let qbe = qbes[ix];
            qbe.set_gif(`games/example/gif/${+ix + 1}.gif`);
          }
          console.log("LISTo")
    }
    pushButton(qbe){
        qbe.rotate_right();
    }
    async resolve(){

        //console.log("VOY A RESOLVER")
        let cantidad_nodos = 3
        console.log(this.cadenas)
        for (let cadena of this.Cadenas()) {
                
        console.log("VOY A RESOLVER",cadena.length,cantidad_nodos)
            if (cadena.length == cantidad_nodos && !this._compare ) {

                console.log("VOY A RESOLVER");
                this._compare = true;

                for ( let ixx =0; ixx< cantidad_nodos ; ++ixx){
                    let qbe = cadena[ixx]
                    //console.log("QBE",qbe);
                    console.log("FILE", `games/example/gif/${+ixx + 1}.gif`);
                    if (!await qbe.compare_gif( `games/example/gif/${+ixx+1}.gif`) ){
                        this.error();
                    return 
                    }
                }
                this.success();
            }
        }
        return null; 
    }
     
}