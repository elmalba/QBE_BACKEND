"use strict";

Nodos = require("../../system/nodos");
reset = require("./init");
module.exports = async function () {
    var cadenas = Nodos.get_cadenas();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = cadenas[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var cadena = _step.value;

            if (cadena.length == 2) {
                var CHECK = true;
                all_promise = [];
                for (ixx = 0; ixx < 2; ++ixx) {
                    var qbe = cadena[ixx];
                    if (!(await qbe.compare_gif("games/example/gif/" + (+ixx + 1) + ".gif"))) {
                        game.error();
                        return;
                    }
                }
                game.success();
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
};