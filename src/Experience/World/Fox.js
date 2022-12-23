import * as THREE from 'three'
import Experience from '../Expreience.js'

export default class Fox {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Debug
        if (this.debug.active)
            this.debugFolder = this.debug.ui.addFolder('Fox')

        this.resource = this.experience.resources.items.fox

        this.setModel()
        this.setAnimation()
    }

    setModel() {
        this.model = this.resource.scene
        this.model.scale.set(0.02, 0.02, 0.02)
        this.scene.add(this.model)

        this.model.traverse(child => {
            if (child instanceof THREE.Mesh)
                child.castShadow = true
        })


    }

    setAnimation() {
        this.animation = {}
        this.animation.mixer = new THREE.AnimationMixer(this.model)

        this.animation.animations = {}

        this.animation.animations.idle = this.animation.mixer.clipAction(this.resource.animations[0])
        this.animation.animations.walking = this.animation.mixer.clipAction(this.resource.animations[1])
        this.animation.animations.running = this.animation.mixer.clipAction(this.resource.animations[2])

        this.animation.animations.current = this.animation.animations.idle
        this.animation.animations.current.play()

        this.animation.play = (name) => {
            const newAction = this.animation.animations[name]
            const oldAction = this.animation.animations.current

            newAction.reset()
            newAction.play()
            newAction.crossFadeFrom(oldAction, 0.5)

            this.animation.animations.current = newAction
        }

        // Debug
        if (this.debug.active) {
            const debugObject = {
                playIdle: () => { this.animation.play('idle')},
                playWalking: () => { this.animation.play('walking')},
                playRunning: () => { this.animation.play('running')},
            }
            this.debugFolder.add(debugObject, 'playIdle')
            this.debugFolder.add(debugObject, 'playWalking')
            this.debugFolder.add(debugObject, 'playRunning')
        }
    }

    update() {
        this.animation.mixer.update(this.time.delta * 0.001)
    }
}