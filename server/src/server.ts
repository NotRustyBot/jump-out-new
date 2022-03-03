import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { AutoView, loop } from "jump-engine";
import { SystemMessage, SystemMessageDatagram } from "jump-out-shared";

let server = createServer(function (request, response) {});

let port = process.env.PORT || 20003;
server.listen(port, function () {
    console.log(new Date() + " WS Server is listening on port " + port);
});

let wsServer = new WebSocketServer({ server });
wsServer.on("connection", onConnection);

let connections: WebSocket[] = [];

let buffer = new ArrayBuffer(1000);
let av = new AutoView(buffer);

function onConnection(connection: WebSocket) {
    console.log("new connection");
    let sendee: SystemMessage = { text: "hello", type: "info" };
    SystemMessageDatagram.serialise(av, sendee);
    connection.send(av);
    connections.push(connection);
}

function main(dt: number) {
    av.index = 0;
    let sendee: SystemMessage = { text: dt.toFixed(3), type: "info" };
    SystemMessageDatagram.serialise(av, sendee);
    for (const connection of connections) {
        connection.send(av);
    }
}

loop.updateOrder.push(main);
loop.start();
