import { AutoView, BaseObject, MovementHandler, MovingObject, PhysicsObject, Vector } from "jump-engine";
import { IControls } from "jump-out-shared";
import { Connection } from "./connection";
import { game } from "./game";

export class Player extends BaseObject {
    physics: MovingObject;
    motion: MovementHandler;
    controls: IControls;
    connection: Connection;
    private constructor() {
        super();
        this.physics = new MovingObject(this);
        this.motion = new MovementHandler(this);
        this.controls = {movement: new Vector()};
    }

    update(dt: number) {
        if (this.controls.movement.x != 0) {
            if (this.controls.movement.x > 0) {
                this.motion.clockwise(dt);
            }else{
                this.motion.anticlockwise(dt);
            }
        }
        if (this.controls.movement.y) {
            if (this.controls.movement.y > 0) {
                this.motion.forward(dt);
            }else{
                this.motion.backward(dt);
            }
        }
        this.motion.cap();
        this.physics.update(dt);
    }

    send(buffer: Buffer){
        this.connection.send(buffer);
    }

    sendAutoView(autoView: AutoView){
        this.connection.sendAutoView(autoView);
    }

    static playerSpawner(connection: Connection) {
        let player = new Player();
        player.physics.position = new Vector(0, 0);
        player.motion.init(player.physics);
        player.connection = connection;
        this.list.set(player.id, player);
        connection.object = player.controls;
        game.addLink(player, [player.physics]);
    }

    static list = new Map<number, Player>();
}
