import Phaser from 'phaser';
import Enemy from './Enemy';

export default class Mushroom extends Enemy {

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'mushroom');

        this.createAnimations();

        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update(time: number, delta: number): void {
        super.update(time, delta);
        if (!this.body) return;

        if (this.body!.velocity.x > 0) {
            this.setFlipX(true);
        } else {
            this.setFlipX(false);
        }

        this.play('m-run', true);
    }

    createAnimations() {
        this.scene.anims.create({
            key: 'm-run',
            frames: this.scene.anims.generateFrameNumbers('mushroom-run', {
                start: 0,
                end: 15,
            }),
            frameRate: 20,
            repeat: -1,
        });
        this.scene.anims.create({
            key: 'm-idle',
            frames: this.scene.anims.generateFrameNumbers('mushroom-idle', {
                start: 0,
                end: 13,
            }),
            frameRate: 20,
            repeat: -1,
        });
    }
}
