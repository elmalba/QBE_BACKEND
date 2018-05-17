const sockets  = {}
sockets["01"] = require("./get_id")
sockets["02"] = require("./get_display");
sockets["03"] = require("./set_left");
sockets["04"] = require("./press_button");
module.exports = sockets;