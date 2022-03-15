import { Component, BaseObject, Vector } from "jump-engine";

export class Physics extends Component {
    position: Vector;
    rotation: number;
    constructor(parent: BaseObject){
        super(parent);
    }
}