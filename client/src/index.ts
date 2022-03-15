import { AutoView, BaseObject } from "jump-engine";
import { packetType } from "jump-out-shared";
import * as PIXI from "pixi.js";
import { RawData } from "ws";
import { Graphics, LoadPrograms } from "./graphics";
import { LoadImages } from "./loader";
import { parsePacket } from "./packetHandlers";

let canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let app = new PIXI.Application({
    antialias: true,
    view: canvas,
    width: canvas.width,
    height: canvas.height,
    backgroundColor: 0x1099bb,
});
app.stop();

let networkReady = false;

LoadPrograms();
LoadImages(() => {
    //new Graphics(new BaseObject(), app.stage, "r300", { size: 1 });
    app.start();
});

function update(dt: number) {}

let outgoing = new AutoView(new ArrayBuffer(100));
setInterval(() => {
    if (networkReady) {
        outgoing.index = 0;
        //ControlsDatagram.serialise(outgoing, { movement: control });
        //connection.send(outgoing);
    }
}, 1000 / 30);

let connection = new WebSocket("ws://127.0.0.1:20003/");
connection.binaryType = "arraybuffer";
connection.onopen = onConnectionOpen;
connection.onmessage = onConnectionMessage;
connection.onclose = onConnectionClose;

function onConnectionOpen() {
    console.log("open");
    outgoing.index = 0;

    let identifier = localStorage.getItem("identifier");
    if (identifier != null) {
        outgoing.writeUint8(packetType.reconnect);
        outgoing.writeString(identifier);
    }else{
        outgoing.writeUint8(packetType.connect);
    }
    
    connection.send(outgoing);
    networkReady = true;
}

function onConnectionMessage(e:MessageEvent) {
    let inView = new AutoView(e.data);
    console.log(e.data);
    
    parsePacket(inView);
}

function onConnectionClose(e: CloseEvent) {
    console.log("close");
}

let printLog: string[] = [];
export function println(text: any) {
    printLog.push(text);
    document.getElementById("log").innerHTML = printLog.join("<br>");
    if (printLog.length > 10) printLog.shift();
}
