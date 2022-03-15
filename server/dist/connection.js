"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connection = void 0;
const jump_out_shared_1 = require("jump-out-shared");
const jump_engine_1 = require("jump-engine");
const chalk = require("chalk");
const game_1 = require("./game");
const player_1 = require("./player");
class Connection {
    constructor(websocket) {
        this.websocket = websocket;
        this.websocket.on("message", (message) => {
            this.messageHandler(message);
        });
        this.websocket.on("close", () => {
            log("connection", this._identity, "closed");
        });
    }
    get identity() {
        return this._identity;
    }
    static handleNew(websocket) {
        let connection = new Connection(websocket);
        while (true) {
            connection._identity = (0, jump_engine_1.makeId)(9);
            if (!Connection.list.has(connection._identity))
                break;
        }
        Connection.list.set(connection._identity, connection);
    }
    send(message) {
        this.websocket.send(message);
    }
    sendAutoView(autoview) {
        this.websocket.send(autoview.buffer.slice(0, autoview.index));
    }
    handleConnect() {
        log("new connection", this._identity);
        if (game_1.game.status == game_1.gameStatus.joinable) {
            player_1.Player.playerSpawner(this);
        }
        this.connectionReply();
    }
    connectionReply() {
        let outView = new jump_engine_1.AutoView(new ArrayBuffer(100));
        outView.writeUint8(jump_out_shared_1.packetType.connected);
        outView.writeString(this._identity);
        this.sendAutoView(outView);
    }
    handleReconnect(inView) {
        let data = jump_out_shared_1.ReconnectDatagram.deserealise(inView);
        let identifier = data.identifier;
        if (Connection.list.has(identifier)) {
            let oldConnection = Connection.list.get(identifier);
            if (oldConnection.websocket.readyState != this.websocket.OPEN) {
                this.object = oldConnection.object;
                this._identity = oldConnection._identity;
                log("reconnected", this._identity);
                Connection.list.set(identifier, this);
                this.connectionReply();
            }
            else {
                log("ignoring already connected", identifier);
            }
        }
        else {
            log("failed to reconnect", identifier, "connecting as", this._identity, "instead");
            this.handleConnect();
        }
    }
    messageHandler(message) {
        let inView = new jump_engine_1.AutoView(message.buffer.slice(message.byteOffset, message.byteOffset + message.byteLength));
        switch (inView.readUint8()) {
            case jump_out_shared_1.packetType.connect:
                this.handleConnect();
                break;
            case jump_out_shared_1.packetType.reconnect:
                this.handleReconnect(inView);
                break;
            default:
                break;
        }
    }
}
exports.Connection = Connection;
Connection.list = new Map();
function log(...array) {
    let out = "";
    for (let index = 0; index < array.length; index++) {
        if (index % 2 == 1) {
            out += " " + chalk.cyanBright(array[index]);
        }
        else {
            out += " " + chalk.yellowBright(array[index]);
        }
    }
    console.log(">" + out);
}
//# sourceMappingURL=connection.js.map