import { Datagram, Vector } from "jump-engine";
import { IComponentIdentity } from "./components";
import { IObjectIdentity } from "./objects";
export * from "./components";
export * from "./objects";
export declare const SystemMessageDatagram: Datagram;
export interface ISystemMessage {
    type: string;
    text: string;
}
export declare const ControlsDatagram: Datagram;
export interface IControls {
    movement: Vector;
}
export declare const ReconnectDatagram: Datagram;
export interface IReconnect {
    identifier: string;
}
export declare const NewObjectsDatagram: Datagram;
export interface INewObjects {
    newObjects: Array<IObjectIdentity>;
    newComponents: Array<IComponentIdentity>;
}
export declare enum packetType {
    connect = 0,
    reconnect = 1,
    connected = 2,
    newObjects = 3
}
