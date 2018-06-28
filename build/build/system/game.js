"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _qbe = require("./qbe");

var _qbe2 = _interopRequireDefault(_qbe);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var MASTER_QBES = [];

var GetQbe = function GetQbe(num) {
  if (MASTER_QBES.length < num) {
    for (var ixx = MASTER_QBES.length; ixx < num; ++ixx) {
      var qbe = new _qbe2.default(ixx);
      qbe.create_socket();
      MASTER_QBES.push(qbe);
    }
  }
  // else if () { }

  return MASTER_QBES;
};

var Game = function () {
  function Game() {
    //this.start()

    _classCallCheck(this, Game);
  }

  _createClass(Game, [{
    key: "SetConfig",
    value: function SetConfig() {
      this.cantidad = this.cantidad ? this.cantidad : 6;
      this.auto_check = this.auto_check ? this.auto_check : true;
      this.auto_check = true;
      this.qbes = GetQbe(this.cantidad);
      this.cadenas = [];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.qbes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var qbe = _step.value;

          qbe.Set_Game(this);
          if (qbe.left) {
            qbe.left.right = null;
            qbe.left = null;
          }
          if (qbe.right) {
            qbe.right.left = null;
            qbe.right = null;
          }
          this.cadenas.push(qbe);
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
    }
  }, {
    key: "info",
    value: function info() {
      return {
        name: this.name,
        description: this.description,
        instructions: this.instructions
      };
    }
  }, {
    key: "start",
    value: function start() {}
  }, {
    key: "run",
    value: function run() {
      this.SetConfig();
      this.start();
    }
  }, {
    key: "reset",
    value: function reset() {
      this.start();
    }
  }, {
    key: "stop",
    value: function stop() {}
  }, {
    key: "resolve",
    value: function resolve() {}
  }, {
    key: "check",
    value: function check() {
      console.log("CHEKEANDO");
      if (this.auto_check) {
        console.log("POR CHEKEAR");
        this.resolve();
        console.log("CHECKEADO");
      }
    }
  }, {
    key: "pushButton",
    value: function pushButton(qbe) {
      qbe.rotate_left();
    }
  }, {
    key: "success",
    value: function success() {
      var _this = this;

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.qbes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var qbe = _step2.value;
          qbe.success();
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      console.log("MUY BIEN ");
      setTimeout(function () {
        _this.reset();
      }, 6000);
    }
  }, {
    key: "error",
    value: function error() {
      var _this2 = this;

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.qbes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var qbe = _step3.value;
          qbe.error();
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      console.log("MUY BIEN ");
      setTimeout(function () {
        _this2.reset();
      }, 6000);
    }
  }, {
    key: "heads",
    value: function heads() {
      var _heads = [];
      //console.log("CABEZAS", this.cadenas);
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.cadenas[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var cadena = _step4.value;

          if (cadena.left == null) {
            var qbe = cadena;
            var secuencia = [];
            while (qbe.right != null) {
              secuencia.push(qbe);
              qbe = qbe.right;
            }
            secuencia.push(qbe);
            _heads.push(secuencia);
          }
        }
        // console.log("CADENAAAAS",_heads)
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return _heads;
    }
  }]);

  return Game;
}();

exports.default = Game;