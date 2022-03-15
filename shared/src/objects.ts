import { datatype, Datagram, } from "jump-engine";


export enum objectType{
    player = 1
}

export const ObjectIdentityDatagram = new Datagram().addField("id", datatype.uint32).addField("type", datatype.uint8);
export interface IObjectIdentity{
    id:number;
    type: objectType
}