"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const ws_1 = require("ws");
const jump_engine_1 = require("jump-engine");
const jump_out_shared_1 = require("jump-out-shared");
let server = (0, http_1.createServer)(function (request, response) { });
let port = process.env.PORT || 20003;
server.listen(port, function () {
    console.log(new Date() + " WS Server is listening on port " + port);
});
let wsServer = new ws_1.WebSocketServer({ server });
wsServer.on("connection", onConnection);
let connections = [];
let buffer = new ArrayBuffer(1000);
let av = new jump_engine_1.AutoView(buffer);
function onConnection(connection) {
    console.log("new connection");
    let sendee = { text: "hello", type: "info" };
    jump_out_shared_1.SystemMessageDatagram.serialise(av, sendee);
    connection.send(av);
    connections.push(connection);
}
function main(dt) {
    av.index = 0;
    let sendee = { text: dt.toFixed(3), type: "info" };
    jump_out_shared_1.SystemMessageDatagram.serialise(av, sendee);
    for (const connection of connections) {
        connection.send(av);
    }
}
jump_engine_1.loop.updateOrder.push(main);
jump_engine_1.loop.start();
//# sourceMappingURL=server.js.map