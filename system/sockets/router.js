const sockets  = {}
sockets["01"] = require("./get_id")
sockets["02"] = require("./get_display");
sockets["03"] = require("./set_left");
module.exports = sockets;