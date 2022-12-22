import * as THREE from 'three'
import Experience from "../Expreience";

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        
        // Test Mesh
        const testMesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({color: 'red', wireframe: true})
        )
        this.scene.add(testMesh)
    }
}