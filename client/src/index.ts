import { AutoView, BaseObject } from "jump-engine";
import { SystemMessage, SystemMessageDatagram } from "jump-out-shared";
import * as PIXI from "pixi.js";
import { Graphics, LoadPrograms } from "./graphics";
import { LoadImages } from "./loader";

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

LoadPrograms();
LoadImages(() => {
    new Graphics(new BaseObject(), app.stage, "r300", {size: 1});
    app.start();
});

function update(dt: number) {}

let connection = new WebSocket("ws://127.0.0.1:20003/");
connection.binaryType = "arraybuffer";
connection.onopen = onConnectionOpen;
connection.onmessage = onConnectionMessage;
connection.onclose = onConnectionClose;

new AutoView(new ArrayBuffer(100));
function onConnectionOpen() {
    console.log("open");
}

function onConnectionMessage(e: MessageEvent) {
    let lole: SystemMessage = SystemMessageDatagram.deserealise(new AutoView(e.data));
    print(lole.text);
}

function onConnectionClose(e: CloseEvent) {
    console.log("close");
}

let printLog: string[] = [];
function print(text: any) {
    printLog.push(text);
    document.getElementById("log").innerHTML = printLog.join("<br>");
    if (printLog.length > 10) printLog.shift();
}
