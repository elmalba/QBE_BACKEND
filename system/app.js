import express from "express"
import Example from "../games/example/game"
import Tube from "../games/Tube/game";
import { WSAEPFNOSUPPORT } from "constants";

const GAMES = [new Example(), new Tube()];
var app = express();
var GAME = GAMES[0]
GAME.run()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get("/Listar", function(req, res) {
    let games = []
    for (let game of GAMES){
        games.push( game.info() );
    }
    res.send(games);
});
app.get("/Listar/:id", function(req, res) {

  res.send(GAMES[req.params["id"]].info() );
});
app.get("/Seleccionar/:id", function(req, res) {
    let ixx = req.params["id"]
    if (GAME!=null){
        GAME.stop()
    }
    GAME = GAMES[ixx]
    GAME.run();

  res.send({status:"OK"});
});


app.listen(3010);