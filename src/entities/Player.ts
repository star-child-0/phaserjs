import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    alive: boolean;
    gravity: number;
    velocityX: number;
    velocityY: number;
    grounded: boolean = false;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'player');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.alive = true;
        this.gravity = 300;
        this.velocityX = 200;
        this.velocityY = 300;
        this.grounded = false;
        this.cursors = this.scene.input.keyboard!.createCursorKeys();

        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
        this.createAnimations();
    }

    die() {
        this.body!.checkCollision.none = true;
        this.alive = false;
        this.setVelocity(-this.velocityX, -this.velocityY);
    }

    update(): void {
        if (!this.body || !this.alive) {
            return;
        }

        const { left, right, down, space } = this.cursors;

        if (left.isDown) {
            this.setVelocityX(-this.velocityX);
            this.setFlipX(true);
        } else if (right.isDown) {
            this.setVelocityX(this.velocityX);
            this.setFlipX(false);
        } else {
            this.setVelocityX(0);
        }

        if (space.isDown && this.grounded) {
            this.grounded = false;
            this.setVelocityY(-this.velocityY);
        }
        if (down.isDown && !this.grounded) {
            this.setVelocityY(this.velocityY);
        }
        if (this.body.blocked.left || this.body.blocked.right){
            this.setVelocityY(0);
            this.grounded = true;
        }

        if (this.body.blocked.down == true){
            this.grounded = true;
        }

        this.play('idle',true)
    }

    createAnimations() {
        this.scene.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player-idle', {
                start: 0,
                end: 10,
            }),
            frameRate: 20,
            repeat: -1,
        });
        this.scene.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('player-run', {
                start: 0,
                end: 10,
            }),
            frameRate: 20,
            repeat: -1,
        });
        this.scene.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('player-jump', {
                start: 0,
                end: 0,
            }),
            frameRate: 20,
            repeat: -1,
        });
        this.scene.anims.create({
            key: 'fall',
            frames: this.anims.generateFrameNumbers('player-fall', {
                start: 0,
                end: 0,
            }),
            frameRate: 20,
            repeat: -1,
        });
        this.scene.anims.create({
            key: 'die',
            frames: this.anims.generateFrameNumbers('player-die', {
                start: 0,
                end: 6,
            }),
            frameRate: 20,
            repeat: -1,
        });

    }
}
