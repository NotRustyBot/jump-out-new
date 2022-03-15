"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const jump_engine_1 = require("jump-engine");
const game_1 = require("./game");
class Player extends jump_engine_1.BaseObject {
    constructor() {
        super();
        this.physics = new jump_engine_1.MovingObject(this);
        this.motion = new jump_engine_1.MovementHandler(this);
        this.controls = { movement: new jump_engine_1.Vector() };
    }
    update(dt) {
        if (this.controls.movement.x != 0) {
            if (this.controls.movement.x > 0) {
                this.motion.clockwise(dt);
            }
            else {
                this.motion.anticlockwise(dt);
            }
        }
        if (this.controls.movement.y) {
            if (this.controls.movement.y > 0) {
                this.motion.forward(dt);
            }
            else {
                this.motion.backward(dt);
            }
        }
        this.motion.cap();
        this.physics.update(dt);
    }
    send(buffer) {
        this.connection.send(buffer);
    }
    sendAutoView(autoView) {
        this.connection.sendAutoView(autoView);
    }
    static playerSpawner(connection) {
        let player = new Player();
        player.physics.position = new jump_engine_1.Vector(0, 0);
        player.motion.init(player.physics);
        player.connection = connection;
        this.list.set(player.id, player);
        connection.object = player.controls;
        game_1.game.addLink(player, [player.physics]);
    }
}
exports.Player = Player;
Player.list = new Map();
//# sourceMappingURL=player.js.map