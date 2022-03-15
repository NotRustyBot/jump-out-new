import { AutoView, BaseObject, Component, MovingObject, PhysicsObject } from "jump-engine";
import { componentType, IComponentIdentity, IObjectIdentity, objectType } from "jump-out-shared";
import { Player } from "./player";

export enum gameStatus {
    generating = 1,
    joinable = 2,
    closed = 3,
}

class Game {
    constructor() {}
    status: gameStatus;
    private componentLinker = new Map<number, IComponentIdentity>();
    private newLinks = new Array<IComponentIdentity>();

    private objectLinker = new Map<number, IObjectIdentity>();
    private newObjects = new Array<IObjectIdentity>();

    addLink(parent: BaseObject, components: Array<Component>) {
        this.newObjects.push(getObjectIdentity(parent));
        for (const component of components) {
            this.newLinks.push(getComponentIdentity(component));
        }
    }

    nextCycle() {
        this.recycleLinks();
    }

    private recycleLinks() {
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

function getComponentIdentity(component: Component): IComponentIdentity {
    return { id: component.componentId, parent: component.parent.id, type: getComponentType(component) };
}

function getComponentType(component: Component): componentType {
    return componentTypeLookup.get(component.constructor.name);
}

function getObjectIdentity(obejct: BaseObject): IObjectIdentity {    
    return { id: obejct.id, type: objectTypeLookup.get(obejct.constructor.name) };
}
const componentTypeLookup = new Map<string, componentType>([
    [PhysicsObject.name, componentType.position],
    [MovingObject.name, componentType.movement],
]);

const objectTypeLookup = new Map<string, objectType>([[Player.name, objectType.player]]);

export const game = new Game();
