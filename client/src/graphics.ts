import * as PIXI from "pixi.js";
import { Physics } from "./physics";
import { Component, BaseObject, Vector } from "jump-engine";

let loader = PIXI.Loader.shared;

export class Graphics extends Component {
    sprite: PIXI.Sprite;
    hidden: boolean;
    uniforms: any;
    material: PIXI.MeshMaterial;
    geometry: PIXI.Geometry;
    sizeInfo: any;
    mesh: PIXI.Mesh;
    physics: Physics;
    constructor(parent: BaseObject, physics: Physics, container: PIXI.Container, name: string, sizeInfo: any) {
        super(parent);
        this.sizeInfo = sizeInfo;
        this.hidden = false;
        this.physics = physics;

        let baseTexture;
        if (loader.resources[name + "_base"] != undefined) {
            this.uniforms = {
                uOutlineSampler: loader.resources[name + "_outline"].texture,
                uDarkSampler: loader.resources[name + "_dark"].texture,
                lightDir: [1, 0],
                rotation: 0,
            };
            baseTexture = loader.resources[name + "_base"].texture;
            this.material = new PIXI.MeshMaterial(baseTexture, {
                program: shadeProg,
                uniforms: this.uniforms,
            });
        } else {
            this.uniforms = {
                uOutlineSampler: loader.resources[name].texture,
                uDarkSampler: loader.resources[name].texture,
                lightDir: [1, 0],
                effectDir: [1, 0],
                effectColor: [1, 1, 0, 1],
                rotation: 0,
            };
            baseTexture = loader.resources[name].texture;
            this.material = new PIXI.MeshMaterial(baseTexture, {
                program: shadeProg,
                uniforms: this.uniforms,
            });
        }

        this.geometry = new PIXI.Geometry();

        this.sizeInfo.upscale = this.sizeInfo.upscale || 1;

        let width = (baseTexture.width / 2) * this.sizeInfo.upscale;
        let height = (baseTexture.height / 2) * this.sizeInfo.upscale;

        this.geometry.addAttribute(
            "aVertexPosition",
            [-width, -height, width, -height, width, height, -width, height],
            2
        );
        this.geometry.addAttribute("aTextureCoord", [0, 0, 1, 0, 1, 1, 0, 1], 2);
        this.geometry.addIndex([0, 1, 2, 2, 3, 0]);

        this.mesh = new PIXI.Mesh(this.geometry, this.material);

        container.addChild(this.mesh);
    }

    update(dt: number) {
        if (this.hidden) {
            this.mesh.visible = false;
        }
        if (!isOnScreen(this.physics.position, 5000)) {
            this.mesh.visible = false;
            return;
        } else {
            if (
                !isOnScreen(this.physics.position, Math.max(this.mesh.width, this.mesh.height) * this.sizeInfo.upscale)
            ) {
                this.mesh.visible = false;
            } else {
                this.mesh.visible = true;
            }

            this.mesh.position.set(this.physics.position.x, this.physics.position.y);

            if (!this.mesh.visible) return;
        }
        /*
        let light = LightEffect.getUniformData(new Vector(this.mesh.position.x, this.mesh.position.y));

        this.material.uniforms.lightDirs = light.lightDirs;
        this.material.uniforms.lightTints = light.lightTints;
        this.material.uniforms.lightPowers = light.lightPowers;
        */
        this.mesh.rotation = this.physics.rotation;
        this.material.uniforms.rotation = this.mesh.rotation;
    }
}

let shadeProg: PIXI.Program;
export function LoadPrograms() {
    getProgram("./programs/shadeFragment.glsl", "./programs/shadeVert.glsl", (prog) => (shadeProg = prog));
}

function get(source: string, cb: (text: string) => void) {
    var client = new XMLHttpRequest();
    client.open("GET", source);
    client.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cb(client.responseText);
        }
    };
    client.send();
}

function getProgram(frag: string, vert: string, cb: (prog: PIXI.Program) => void) {
    let fragCode = "";
    let vertCode = "";
    function check() {
        if (fragCode != "" && vertCode != "") {
            cb(new PIXI.Program(vertCode, fragCode));
        }
    }
    get(vert, (e) => {
        vertCode = e;
        check();
    });
    get(frag, (e) => {
        fragCode = e;
        check();
    });
}

function isOnScreen(position: Vector, size: number): boolean {
    throw new Error("Function not implemented.");
}

