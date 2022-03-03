"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jump_engine_1 = require("jump-engine");
const jump_out_shared_1 = require("jump-out-shared");
let connection = new WebSocket("ws://127.0.0.1:20003/");
connection.binaryType = "arraybuffer";
connection.onopen = onConnectionOpen;
connection.onmessage = onConnectionMessage;
connection.onclose = onConnectionClose;
new jump_engine_1.AutoView(new ArrayBuffer(100));
function onConnectionOpen() {
    console.log("open");
}
function onConnectionMessage(e) {
    let lole = jump_out_shared_1.SystemMessageDatagram.deserealise(new jump_engine_1.AutoView(e.data));
    console.log(lole.text);
    print(lole.text);
}
function onConnectionClose(e) {
    console.log("close");
}
let printLog = [];
function print(text) {
    printLog.push(text);
    document.getElementById("log").innerHTML = printLog.join("<br>");
    if (printLog.length > 10)
        printLog.shift();
}
//# sourceMappingURL=index.js.map