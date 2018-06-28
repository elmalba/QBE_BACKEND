"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _async_hooks = require("async_hooks");

var _sockets = require("./sockets");

var _sockets2 = _interopRequireDefault(_sockets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var numbers = require("./qbe/numbers");
var error = require("./qbe/error");
var initial = require("./qbe/initial");
var _warning = require("./qbe/warning");
var success = require("./qbe/success");
var net = require("net");
var chalk = require("chalk");
var sockets = require("./sockets/router");
var getPixels = require("get-pixels");
var log = console.log;

var QBE = function () {
  function QBE(node) {
    _classCallCheck(this, QBE);

    this.node = node;

    this.socket = null;
    this.matrix = [initial];
    this.game = null;
    this.times = [];
    this.left = null;
    this.right = null;
    //this.right = this.rotate_left;
    //console.log("CREANDO NODO");
  }

  _createClass(QBE, [{
    key: "Set_Game",
    value: function Set_Game(game) {
      this.game = game;
    }
  }, {
    key: "create_socket",
    value: function create_socket() {
      var _this = this;

      // console.log("CREAR NODO");
      (0, _sockets2.default)(this.node, function (sock) {
        _this.set_socket(sock);
      });
    }
  }, {
    key: "set_references",
    value: function set_references(nodos) {
      this.nodos = nodos;
    }
  }, {
    key: "set_socket",
    value: function set_socket(socket) {
      var _this2 = this;

      //this.socket = socket;

      console.log("READY");
      socket.on("data", function (data) {
        // try {
        var option = "" + String.fromCharCode(data[0]) + String.fromCharCode(data[1]);
        if (sockets[option] == undefined) {
          socket.write("-1");
          return;
        } else {
          data = "" + data;
          data = data.substr(1);
          data = data.substr(1);

          sockets[option](_this2, data, socket);
        }
        //  } catch (error) {
        //    socket.write("-2");
        //  }
      });
    }

    /* receive() {
      sock.on("data", function(data) {
        console.log("DATA " + sock.remoteAddress + ": " + data);
        // Write the data back to the socket, the client will receive it as data from the server
        //sock.write('You said "' + data + '"');
      });
    }*/

  }, {
    key: "set_figure",
    value: function set_figure(figure) {}
  }, {
    key: "set_number",
    value: function set_number(number) {
      this.matrix = [numbers[number]];
      this.time = [4];
    }
  }, {
    key: "set_gif",
    value: function set_gif(path) {
      var _this3 = this;

      getPixels(path, function (err, pixels) {
        if (err) {
          console.log("Bad image path");
          return;
        }

        var out = [];

        var ixx = 0;
        for (var jx = 0; jx < 8; ++jx) {
          var in_out = new Array(8);
          for (var ix = 0; ix < 8; ++ix) {
            in_out[ix] = [pixels.data[ixx], pixels.data[ixx + 1], pixels.data[ixx + 2]];
            ixx = ixx + 4;
          }
          out.push(in_out);
        }
        //console.log(out);
        _this3.matrix = [out];
        _this3.time = [0];
        _this3.rotate_left();
      });
    }
  }, {
    key: "compare_gif",
    value: function compare_gif(path) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        getPixels(path, function (err, pixels) {
          if (err) {
            console.log("Bad image path");
            resolve(false);
            return;
          }

          var matrix = _this4.matrix[0];
          var ixx = 0;
          for (var ix = 0; ix < 8; ++ix) {
            for (var jx = 0; jx < 8; ++jx) {
              //console.log(matrix[jx][7 - ix],[ pixels.data[ixx],pixels.data[+ixx + 1] ,pixels.data[+ixx + 2]]   );
              if (matrix[7 - jx][ix][0] != pixels.data[ixx] || matrix[7 - jx][ix][1] != pixels.data[+ixx + 1] || matrix[7 - jx][ix][2] != pixels.data[+ixx + 2]) {
                //console.log("ERR", matrix[ix][jx][0], pixels.data[ixx], matrix[ix][jx][1], pixels.data[+ixx + 1], matrix[ix][jx][2], pixels.data[+ixx + 2]);
                resolve(false);
              }
              ixx = ixx + 4;
            }
          }
          resolve(true);
        });
      });
    }
  }, {
    key: "error",
    value: function error() {
      //this.matrix = [error];
      this.set_gif("system/qbe/error.gif");
      this.time = [0];
    }
  }, {
    key: "success",
    value: function success() {
      this.set_gif("system/qbe/success.gif");
      // this.matrix = [success];
      this.time = [0];
    }
  }, {
    key: "warning",
    value: function warning() {
      this.matrix = [_warning];
      this.time = [0];
    }
  }, {
    key: "rotate_right",
    value: function rotate_right() {
      var new_matrix = new Array(8);
      var old_matrix = this.matrix[0];

      for (var ix = 0; ix < 8; ++ix) {
        new_matrix[ix] = new Array(8);
        for (var jx = 0; jx < 8; ++jx) {
          new_matrix[ix][7 - jx] = old_matrix[jx][ix];
        }
      }
      this.matrix[0] = new_matrix;
    }
  }, {
    key: "rotate_left",
    value: function rotate_left() {
      var new_matrix = new Array(8);
      var old_matrix = this.matrix[0];

      for (var ix = 0; ix < 8; ++ix) {
        new_matrix[ix] = new Array(8);
        for (var jx = 0; jx < 8; ++jx) {
          new_matrix[ix][jx] = old_matrix[jx][7 - ix];
        }
      }
      this.matrix[0] = new_matrix;
    }
  }, {
    key: "button",
    value: function button() {
      this.BUTTON();
    }
  }, {
    key: "set_button",
    value: function set_button(func) {
      this.BUTTON = func;
    }
  }, {
    key: "print_screen",
    value: function print_screen() {
      var out = void 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.matrix[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var matrix = _step.value;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = matrix[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var line = _step2.value;

              out = "     ";
              var _iteratorNormalCompletion3 = true;
              var _didIteratorError3 = false;
              var _iteratorError3 = undefined;

              try {
                for (var _iterator3 = line[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  var pos = _step3.value;

                  out = out + " " + chalk.rgb(pos[0], pos[1], pos[2])("*") + " ";
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

              console.log(out);
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
  }]);

  return QBE;
}();

exports.default = QBE;