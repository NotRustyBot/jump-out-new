"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectIdentityDatagram = exports.objectType = void 0;
const jump_engine_1 = require("jump-engine");
var objectType;
(function (objectType) {
    objectType[objectType["player"] = 1] = "player";
})(objectType = exports.objectType || (exports.objectType = {}));
exports.ObjectIdentityDatagram = new jump_engine_1.Datagram().addField("id", jump_engine_1.datatype.uint32).addField("type", jump_engine_1.datatype.uint8);
//# sourceMappingURL=objects.js.map