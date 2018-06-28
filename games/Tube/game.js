import Game from  "../../system/game";

export default class Example extends Game{
    constructor(){
        //this.nodos = 6  // por defecto inicia 6 qbe
        // this.auto_check = false // default = TRUE
      
        super();
        this.name = "Cañerias";
        this.description = "Conecta cañerias";
        this.instructions = "Por su culpa el shampoo tiene instrucciones";
    }
    start(){
          let qbes = this.qbes;
          for (let ix in qbes) {
            let qbe = qbes[ix];
            qbe.set_gif(`games/tube/gif/tube-${+ix + 1}.gif`);
          }
          console.log("LISTo")
    }
    pushButton(qbe){
        qbe.rotate_left();
    }
    async resolve(){
        let cadenas = this.heads();
        for (let cadena of cadenas) {
            if (cadena.length == 2) {
                for ( ixx =0; ixx<2; ++ixx){
                    let qbe = cadena[ixx]
                    if (!await this.compare_gif( `games/example/gif/${+ixx+1}.gif`) ){
                        this.error();
                    return 
                    }
                }
                this.success();
            }
        }
    }
}