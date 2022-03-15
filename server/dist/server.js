"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const ws_1 = require("ws");
const jump_engine_1 = require("jump-engine");
const connection_1 = require("./connection");
const game_1 = require("./game");
const player_1 = require("./player");
const jump_out_shared_1 = require("jump-out-shared");
let server = (0, http_1.createServer)(function (request, response) { });
game_1.game.status = game_1.gameStatus.joinable;
let port = process.env.PORT || 20003;
server.listen(port, function () {
    console.log(new Date() + " WS Server is listening on port " + port);
});
let wsServer = new ws_1.WebSocketServer({ server });
wsServer.on("connection", onConnection);
let buffer = new ArrayBuffer(1000);
let outView = new jump_engine_1.AutoView(buffer);
function onConnection(connection) {
    connection_1.Connection.handleNew(connection);
}
function main(dt) {
    outView.index = 0;
    let newObjects = {
        newObjects: game_1.game.getNewObjects(),
        newComponents: game_1.game.getNewLinks(),
    };
    if (newObjects.newComponents.length > 0) {
        outView.writeUint8(jump_out_shared_1.packetType.newObjects);
        jump_out_shared_1.NewObjectsDatagram.serialise(outView, newObjects);
    }
    for (const [id, player] of player_1.Player.list) {
        player.update(dt);
        if (outView.index > 0) {
            player.sendAutoView(outView);
        }
    }
    game_1.game.nextCycle();
}
jump_engine_1.loop.updateOrder.push(main);
jump_engine_1.loop.start();
//# sourceMappingURL=server.js.map