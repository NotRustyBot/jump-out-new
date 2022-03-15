import { Datagram } from "jump-engine";
export declare enum objectType {
    player = 1
}
export declare const ObjectIdentityDatagram: Datagram;
export interface IObjectIdentity {
    id: number;
    type: objectType;
}
