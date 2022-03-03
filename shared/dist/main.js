"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemMessageDatagram = void 0;
const jump_engine_1 = require("jump-engine");
exports.SystemMessageDatagram = new jump_engine_1.Datagram().addField("type", jump_engine_1.datatype.string).addField("text", jump_engine_1.datatype.string);
//# sourceMappingURL=main.js.map