import { Datagram } from "jump-engine";
export declare const SystemMessageDatagram: Datagram;
export interface SystemMessage {
    type: string;
    text: string;
}
