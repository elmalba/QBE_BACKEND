"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _game = require("../games/example/game");

var _game2 = _interopRequireDefault(_game);

var _game3 = require("../games/Tube/game");

var _game4 = _interopRequireDefault(_game3);

var _constants = require("constants");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var GAMES = [new _game2.default(), new _game4.default()];
var app = (0, _express2.default)();
var GAME = GAMES[0];
GAME.run();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get("/Listar", function (req, res) {
    var games = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = GAMES[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var game = _step.value;

            games.push(game.info());
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

    res.send(games);
});
app.get("/Listar/:id", function (req, res) {

    res.send(GAMES[req.params["id"]].info());
});
app.get("/Seleccionar/:id", function (req, res) {
    var ixx = req.params["id"];
    if (GAME != null) {
        GAME.stop();
    }
    GAME = GAMES[ixx];
    GAME.run();

    res.send({ status: "OK" });
});

app.listen(3010);