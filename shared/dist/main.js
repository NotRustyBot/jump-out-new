"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.packetType = exports.NewObjectsDatagram = exports.ReconnectDatagram = exports.ControlsDatagram = exports.SystemMessageDatagram = void 0;
const jump_engine_1 = require("jump-engine");
const components_1 = require("./components");
const objects_1 = require("./objects");
__exportStar(require("./components"), exports);
__exportStar(require("./objects"), exports);
exports.SystemMessageDatagram = new jump_engine_1.Datagram().addField("type", jump_engine_1.datatype.string).addField("text", jump_engine_1.datatype.string);
exports.ControlsDatagram = new jump_engine_1.Datagram().addField("movement", jump_engine_1.datatype.vector32);
exports.ReconnectDatagram = new jump_engine_1.Datagram().addField("identifier", jump_engine_1.datatype.string);
exports.NewObjectsDatagram = new jump_engine_1.Datagram().addArray("newObjects", objects_1.ObjectIdentityDatagram).addArray("newComponents", components_1.ComponentIdentityDatagram);
var packetType;
(function (packetType) {
    packetType[packetType["connect"] = 0] = "connect";
    packetType[packetType["reconnect"] = 1] = "reconnect";
    packetType[packetType["connected"] = 2] = "connected";
    packetType[packetType["newObjects"] = 3] = "newObjects";
})(packetType = exports.packetType || (exports.packetType = {}));
//# sourceMappingURL=main.js.map