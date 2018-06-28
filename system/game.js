import QBE from "./qbe";

const MASTER_QBES=[]

let GetQbe = (num) =>{
    if(MASTER_QBES.length < num ){
        for (let ixx = MASTER_QBES.length; ixx < num; ++ixx) {
            let qbe = new QBE( ixx);
            qbe.create_socket();
            MASTER_QBES.push(qbe);
        }
    }
    // else if () { }

    return MASTER_QBES

}


class Game {
  constructor() {
    //this.start()
  }
  SetConfig() {
    this.cantidad = this.cantidad ? this.cantidad : 6;
    this.auto_check = this.auto_check ? this.auto_check : true;
    this.auto_check = true;
    this.qbes = GetQbe(this.cantidad);
    this.cadenas = [];
    this._compare= false;

    for (let qbe of this.qbes) {
      qbe.Set_Game(this);
      if (qbe.left) {
        qbe.left.right = null;
        qbe.left = null;
      }
      if (qbe.right) {
        qbe.right.left = null;
        qbe.right = null;
      }
      this.cadenas.push(true);
    }
  }
  info() {
    return {
      name: this.name,
      description: this.description,
      instructions: this.instructions
    };
  }
  start() {}
  run() {
    this.SetConfig();
    this.start();
  }
  reset() {
    this.cadenas = [];
            for (let qbe of this.qbes) {
              qbe.Set_Game(this);
              if (qbe.left) {
                qbe.left.right = null;
                qbe.left = null;
              }
              if (qbe.right) {
                qbe.right.left = null;
                qbe.right = null;
              }
              this.cadenas.push(true);
            }

            this._compare = false;
            this.start();
          }
  stop() {}
 // async resolve() {}
  check() {
    //console.log("CHEKEANDO");
    if (this.auto_check) {
      //console.log("POR CHEKEAR");
      this.resolve();
     // console.log("CHECKEADO");
    }
  }
  pushButton(qbe) {
    qbe.rotate_left();
  }
  success() {
    for (let qbe of this.qbes) qbe.success();
    console.log("MUY BIEN ");
    setTimeout(() => {
      this.reset();
    }, 6000);
  }
  error() {
    for (let qbe of this.qbes) qbe.error();
    console.log("MUY BIEN ");
    setTimeout(() => {
      this.reset();
    }, 6000);
  }

  Cadenas() {
    var Heads = [];
   
    for (let ix in this.cadenas) {
       
      if (this.cadenas[ix] == true) {
                                     // console.log("CABEZAS", this.cadenas[ix]);
                                      var qbe = MASTER_QBES[ix];
                                      
                                      // console.log("AQUI 1 ")
                                       var secuencia = [];
                                      // console.log("AQUI 2");
                                      while (qbe != null && qbe.right!=null && qbe.right.node!=qbe.node) {
                                        secuencia.push(qbe);
                                        qbe = qbe.right;
                                       // console.log("AQUI 3 ");
                                      }
                                       secuencia.push(qbe);
                                     // console.log("AQUI 4");
                                     // secuencia.push(qbe);
                                      Heads.push(secuencia);
                                     // console.log("AQUI 5");
                                    }
    }
    // 
    
    //console.log("CADENAAAAS",this.cadenas,Heads)
    return Heads;
  }
}
export default Game;