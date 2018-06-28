"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _game = require("../../system/game");

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Example = function (_Game) {
    _inherits(Example, _Game);

    function Example() {
        _classCallCheck(this, Example);

        var _this = _possibleConstructorReturn(this, (Example.__proto__ || Object.getPrototypeOf(Example)).call(this));
        //this.nodos = 6  // por defecto inicia 6 qbe
        // this.auto_check = false // default = TRUE

        _this.name = "Ordenar Menor a  Mayor";
        _this.description = "Juego Ejemplo para crear más juegos";
        _this.instructions = "Este juego consiste en ordernar los QBE según sus numeros en pantalla de menor a mayor";
        return _this;
    }

    _createClass(Example, [{
        key: "start",
        value: function start() {
            var qbes = this.qbes;
            for (var ix in qbes) {
                var qbe = qbes[ix];
                qbe.set_gif("games/example/gif/" + (+ix + 1) + ".gif");
            }
            console.log("LISTo");
        }
    }, {
        key: "pushButton",
        value: function pushButton(qbe) {
            qbe.rotate_right();
        }
    }, {
        key: "resolve",
        value: async function resolve() {

            //console.log("VOY A RESOLVER")
            var cantidad_nodos = 3;
            console.log(this.cadenas);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.Cadenas()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var cadena = _step.value;


                    console.log("VOY A RESOLVER", cadena.length, cantidad_nodos);
                    if (cadena.length == cantidad_nodos && !this._compare) {

                        console.log("VOY A RESOLVER");
                        this._compare = true;

                        for (var ixx = 0; ixx < cantidad_nodos; ++ixx) {
                            var qbe = cadena[ixx];
                            //console.log("QBE",qbe);
                            console.log("FILE", "games/example/gif/" + (+ixx + 1) + ".gif");
                            if (!(await qbe.compare_gif("games/example/gif/" + (+ixx + 1) + ".gif"))) {
                                this.error();
                                return;
                            }
                        }
                        this.success();
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

            return null;
        }
    }]);

    return Example;
}(_game2.default);

exports.default = Example;