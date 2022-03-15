import { datatype, Datagram, Vector } from "jump-engine";
import { ComponentIdentityDatagram, IComponentIdentity } from "./components";
import { IObjectIdentity, ObjectIdentityDatagram } from "./objects";
export * from "./components";
export * from "./objects";

export const SystemMessageDatagram = new Datagram().addField("type", datatype.string).addField("text", datatype.string);
export interface ISystemMessage {
    type: string;
    text: string;
}

export const ControlsDatagram = new Datagram().addField("movement", datatype.vector32);
export interface IControls {
    movement: Vector;
}

export const ReconnectDatagram = new Datagram().addField("identifier", datatype.string);
export interface IReconnect {
    identifier: string;
}

export const NewObjectsDatagram = new Datagram().addArray("newObjects", ObjectIdentityDatagram).addArray("newComponents", ComponentIdentityDatagram);
export interface INewObjects {
    newObjects: Array<IObjectIdentity>;
    newComponents: Array<IComponentIdentity>;
}

export enum packetType{
    connect = 0,
    reconnect = 1,
    connected = 2,
    newObjects = 3
}

