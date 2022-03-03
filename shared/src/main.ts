import { datatype, Datagram } from "jump-engine";

export const SystemMessageDatagram = new Datagram().addField("type", datatype.string).addField("text", datatype.string);
export interface SystemMessage {
    type: string;
    text: string;
}
