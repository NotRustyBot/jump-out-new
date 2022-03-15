import { packetType,  IReconnect, ReconnectDatagram } from "jump-out-shared";
import { AutoView, makeId } from "jump-engine";
import { WebSocket } from "ws";
import chalk = require("chalk");
import { game, gameStatus } from "./game";
import { Player } from "./player";

export class Connection {
    private websocket: WebSocket;
    private _identity: string;
    object: any;
    public get identity(): string {
        return this._identity;
    }

    private constructor(websocket: WebSocket) {
        this.websocket = websocket;
        this.websocket.on("message", (message: Buffer) => {
            this.messageHandler(message);
        });
        this.websocket.on("close", () => {
            log("connection", this._identity, "closed");
        });
    }

    static handleNew(websocket: WebSocket) {
        let connection = new Connection(websocket);
        while (true) {
            connection._identity = makeId(9);
            if (!Connection.list.has(connection._identity)) break;
        }
        Connection.list.set(connection._identity, connection);
    }

    send(message: Buffer) {
        this.websocket.send(message);
    }

    sendAutoView(autoview: AutoView) {
        this.websocket.send(autoview.buffer.slice(0, autoview.index));
    }

    private handleConnect() {
        log("new connection", this._identity);
        if (game.status == gameStatus.joinable) {
            Player.playerSpawner(this);
        }
        this.connectionReply();
    }

    private connectionReply() {
        let outView = new AutoView(new ArrayBuffer(100));
        outView.writeUint8(packetType.connected);
        outView.writeString(this._identity);
        this.sendAutoView(outView);
    }

    private handleReconnect(inView: AutoView) {
        let data: IReconnect = ReconnectDatagram.deserealise(inView);
        let identifier = data.identifier;
        if (Connection.list.has(identifier)) {
            let oldConnection = Connection.list.get(identifier);
            if (oldConnection.websocket.readyState != this.websocket.OPEN) {
                this.object = oldConnection.object;
                this._identity = oldConnection._identity;
                log("reconnected", this._identity);
                Connection.list.set(identifier, this);
                this.connectionReply();
            } else {
                log("ignoring already connected", identifier);
            }
        } else {
            log("failed to reconnect", identifier, "connecting as", this._identity, "instead");
            this.handleConnect();
        }
    }

    private messageHandler(message: Buffer) {
        let inView = new AutoView(message.buffer.slice(message.byteOffset, message.byteOffset + message.byteLength));

        switch (inView.readUint8()) {
            case packetType.connect:
                this.handleConnect();
                break;
            case packetType.reconnect:
                this.handleReconnect(inView);
                break;
            default:
                break;
        }
    }

    private static list = new Map<string, Connection>();
}

function log(...array: Array<string>) {
    let out = "";
    for (let index = 0; index < array.length; index++) {
        if (index % 2 == 1) {
            out += " " + chalk.cyanBright(array[index]);
        } else {
            out += " " + chalk.yellowBright(array[index]);
        }
    }

    console.log(">" + out);
}
