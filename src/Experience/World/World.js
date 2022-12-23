import * as THREE from 'three'
import Experience from "../Expreience";
import Environment from './Environment';
import Floor from './Floor.js';
import Fox from './Fox.js';

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () => {
            this.floor = new Floor()
            this.fox = new Fox()
            this.environment = new Environment()
        })
    }

    update() {
        if (this.fox)
            this.fox.update()
    }
}