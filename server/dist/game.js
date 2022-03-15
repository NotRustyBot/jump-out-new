"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.game = exports.gameStatus = void 0;
const jump_engine_1 = require("jump-engine");
const jump_out_shared_1 = require("jump-out-shared");
const player_1 = require("./player");
var gameStatus;
(function (gameStatus) {
    gameStatus[gameStatus["generating"] = 1] = "generating";
    gameStatus[gameStatus["joinable"] = 2] = "joinable";
    gameStatus[gameStatus["closed"] = 3] = "closed";
})(gameStatus = exports.gameStatus || (exports.gameStatus = {}));
class Game {
    constructor() {
        this.componentLinker = new Map();
        this.newLinks = new Array();
        this.objectLinker = new Map();
        this.newObjects = new Array();
    }
    addLink(parent, components) {
        this.newObjects.push(getObjectIdentity(parent));
        for (const component of components) {
            this.newLinks.push(getComponentIdentity(component));
        }
    }
    nextCycle() {
        this.recycleLinks();
    }
    recycleLinks() {
        for (const identity of this.newLinks) {
            this.componentLinker.set(identity.parent, identity);
        }
        this.newLinks = [];
        for (const identity of this.newObjects) {
            this.objectLinker.set(identity.id, identity);
        }
        this.newObjects = [];
    }
    getNewLinks() {
        return this.newLinks;
    }
    getNewObjects() {
        return this.newObjects;
    }
}
function getComponentIdentity(component) {
    return { id: component.componentId, parent: component.parent.id, type: getComponentType(component) };
}
function getComponentType(component) {
    return componentTypeLookup.get(component.constructor.name);
}
function getObjectIdentity(obejct) {
    return { id: obejct.id, type: objectTypeLookup.get(obejct.constructor.name) };
}
const componentTypeLookup = new Map([
    [jump_engine_1.PhysicsObject.name, jump_out_shared_1.componentType.position],
    [jump_engine_1.MovingObject.name, jump_out_shared_1.componentType.movement],
]);
const objectTypeLookup = new Map([[player_1.Player.name, jump_out_shared_1.objectType.player]]);
exports.game = new Game();
//# sourceMappingURL=game.js.map