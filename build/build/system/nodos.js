"use strict";

var create_sockets_nodes = require("./sockets");
var nodos;
var cadenas;
var init = function init(game, cantidad_nodos) {
    nodos = new Array(cantidad_nodos);
    cadenas = new Array(cantidad_nodos);
    return create_sockets_nodes(game, nodos, cadenas, cantidad_nodos);
};

var GET_NODO = function GET_NODO(ix) {
    if (ix > nodos.length) {
        console.log("NODO INEXISTENTE");
        return null;
    }
    return nodos[ix];
};

var GET_CADENAS = function GET_CADENAS() {

    var Cadenas = [];
    for (var ix in cadenas) {
        var cadena = cadenas[ix];
        var out = [];
        if (cadena) {
            out.push(nodos[ix]);
            var next = nodos[ix].rigth;
            while (next) {
                out.push(next);
                next = next.rigth;
            }
            Cadenas.push(out);
        }
    }
    return Cadenas;
};

module.exports = {
    init: init,
    get: GET_NODO,
    get_cadenas_all: function get_cadenas_all() {
        return cadenas;
    },
    get_cadenas: GET_CADENAS,
    get_all: function get_all() {
        return nodos;
    }
};