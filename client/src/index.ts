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

let list = [
    "LMAO jíít já tu nechci být!",
    "nula čtyři nula pět cos to jacku cos to sněd",
    "remobing Error plis vejt",
    "dobrá kočka prd ví",
    "vič skůl ju hav tu drop aut to greduejt? péérešut skůl",
    "načítám skočeč",
    "diskord ping pingus bingus ket",
    "from di first styrings ov lajf beníf voter.",
    "ven ju pozdě",
    "kemo ten loudér nějak sakuje",
    "hau it fils tu ču fajf gam",
    "grafárna? usmažit, prosím.",
    "máš hlad? jdi jíst.",
    "konzole log kolik máš drog",
];

LoadPrograms();
LoadImages(() => {
    PIXI.Ticker.shared.add(update);
    let say = new SpeechSynthesisUtterance(list[Math.floor(Math.random() * list.length)]);
    speechSynthesis.speak(say);

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
