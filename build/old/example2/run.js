"use strict";

GAME = require("../../system/game");
init = require("./init");
resolve = require("./resolve");
game = new GAME(init, resolve, 6);
game.auto_check(true);