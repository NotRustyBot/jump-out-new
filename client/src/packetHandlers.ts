import { AutoView, BaseObject } from "jump-engine";
import { componentType, INewObjects, NewObjectsDatagram, objectType, packetType } from "jump-out-shared";
import { println } from ".";

export function parsePacket(inView: AutoView) {
    switch (inView.readUint8()) {
        case packetType.connected:
            handleConnected(inView);
            break;
        case packetType.newObjects:
            handleNewObjects(inView);
            break;
        default:
            break;
    }
}

function handleConnected(inView: AutoView) {
    let identifier = inView.readString();
    println(identifier);
    localStorage.setItem("identifier", identifier);
}

function handleNewObjects(inView: AutoView) {
    let newObjects:INewObjects = NewObjectsDatagram.deserealise(inView);
    for (const object of newObjects.newObjects) {
        console.log("created " + objectType[object.type] + " with id "+ object.id);
        //do stuff
    }

    for (const component of newObjects.newComponents) {
        console.log("created " + componentType[component.type] + " with id "+ component.id + " for parent " + component.parent);
        //do stuff
    }
}
