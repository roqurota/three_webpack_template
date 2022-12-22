import * as THREE from 'three';
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js';
import Camera from './Camera.js'
import Renderer from './Renderer.js';
import World from './World/World.js';

let instance = null;

export default class Experience {
    constructor(canvas) {

        if (instance) {
            return instance
        }
        instance = this

        // Global access
        window.experience = this;

        // Options
        this.canvas = canvas

        // Setup
        this.sizes = new Sizes();
        this.time = new Time();
        this.scene = new THREE.Scene();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.world = new World()

        this.sizes.on('resize', () => {
            this.resize();
        })

        this.time.on('tick', () => {
            this.update()
        })
    }

    update() {
        this.camera.update()
        this.renderer.update()
    }

    resize() {
        this.camera.resize()
        this.renderer.resize()
    }
}