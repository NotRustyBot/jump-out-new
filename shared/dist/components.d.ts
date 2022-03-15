import { Datagram, Vector } from "jump-engine";
export declare enum componentType {
    position = 1,
    movement = 2
}
export declare const ComponentIdentityDatagram: Datagram;
export interface IComponentIdentity {
    id: number;
    parent: number;
    type: componentType;
}
export declare const PositionComponentDatagram: Datagram;
export interface IPositionComponent {
    position: Vector;
    rotation: number;
}
export declare const MovementComponentDatagram: Datagram;
export interface IMovementComponent {
    position: Vector;
    rotation: number;
    velocity: Vector;
}
