"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovementComponentDatagram = exports.PositionComponentDatagram = exports.ComponentIdentityDatagram = exports.componentType = void 0;
const jump_engine_1 = require("jump-engine");
var componentType;
(function (componentType) {
    componentType[componentType["position"] = 1] = "position";
    componentType[componentType["movement"] = 2] = "movement";
})(componentType = exports.componentType || (exports.componentType = {}));
exports.ComponentIdentityDatagram = new jump_engine_1.Datagram().addField("id", jump_engine_1.datatype.uint32).addField("parent", jump_engine_1.datatype.uint32).addField("type", jump_engine_1.datatype.uint8);
exports.PositionComponentDatagram = new jump_engine_1.Datagram().addField("position", jump_engine_1.datatype.vector32).addField("rotation", jump_engine_1.datatype.float32);
exports.MovementComponentDatagram = new jump_engine_1.Datagram().addField("position", jump_engine_1.datatype.vector32).addField("rotation", jump_engine_1.datatype.float32).addField("velocity", jump_engine_1.datatype.vector32);
//# sourceMappingURL=components.js.map