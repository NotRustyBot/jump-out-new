import { createServer } from "http";
import { WebSocketServer, WebSocket, RawData } from "ws";
import { AutoView, loop } from "jump-engine";
import { Connection } from "./connection";
import { game, gameStatus } from "./game";
import { Player } from "./player";
import { INewObjects, NewObjectsDatagram, packetType } from "jump-out-shared";

let server = createServer(function (request, response) {});

game.status = gameStatus.joinable;

let port = process.env.PORT || 20003;
server.listen(port, function () {
    console.log(new Date() + " WS Server is listening on port " + port);
});

let wsServer = new WebSocketServer({ server });
wsServer.on("connection", onConnection);

let buffer = new ArrayBuffer(1000);
let outView = new AutoView(buffer);

function onConnection(connection: WebSocket) {
    Connection.handleNew(connection);
}

function main(dt: number) {
    outView.index = 0;
    let newObjects: INewObjects = {
        newObjects: game.getNewObjects(),
        newComponents: game.getNewLinks(),
    };
    if (newObjects.newComponents.length > 0) {
        outView.writeUint8(packetType.newObjects);
        NewObjectsDatagram.serialise(outView, newObjects);
    }

    for (const [id, player] of Player.list) {
        player.update(dt);
        if (outView.index > 0) {
            player.sendAutoView(outView);
        }
    }
    game.nextCycle();
}

loop.updateOrder.push(main);
loop.start();
