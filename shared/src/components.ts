import { datatype, Datagram, Vector } from "jump-engine";

export enum componentType {
    position = 1,
    movement = 2
}

export const ComponentIdentityDatagram = new Datagram().addField("id", datatype.uint32).addField("parent", datatype.uint32).addField("type", datatype.uint8);
export interface IComponentIdentity {
    id: number;
    parent: number;
    type: componentType;
}

export const PositionComponentDatagram = new Datagram().addField("position", datatype.vector32).addField("rotation", datatype.float32);
export interface IPositionComponent {
    position: Vector;
    rotation: number;
}

export const MovementComponentDatagram = new Datagram().addField("position", datatype.vector32).addField("rotation", datatype.float32).addField("velocity", datatype.vector32);
export interface IMovementComponent {
    position: Vector;
    rotation: number;
    velocity: Vector;
}
