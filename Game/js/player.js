export class Player {
    constructor(scene, x, y) { 
        this.scene = scene;
        //add sprite,make it 1.2 times bigger and make him spawn st bottom left of the canvas
        this.sprite = scene.physics.add.sprite(x, y, 'idle').setScale(1.2);
        this.sprite.setOrigin(0.5, 1);
        this.sprite.setCollideWorldBounds(true);
        this.sprite.body.setSize(60, 110).setOffset(35, 10);
        this.isJumping = false;
        this.animations();
    }
    //creating animation for player(idle,run and jump)
    //load each frame
    animations() {
        this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNumbers('idle', { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1 
        });
        this.scene.anims.create({
            key: 'run',
            frames: this.scene.anims.generateFrameNumbers('run', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'jump',
            frames: this.scene.anims.generateFrameNumbers('jump', { start: 0, end: 11 }),
            frameRate: 12,
            repeat: 0
        });
        this.sprite.play('idle');
    }
    //movement logic and velocity left and right 
    move(cursors) {
        if (cursors.left.isDown) {
            this.sprite.setVelocityX(-200);
            if (this.sprite.body.touching.down && !this.isJumping) this.sprite.play('run', true);
            this.sprite.flipX = true;
        } else if (cursors.right.isDown) {
            this.sprite.setVelocityX(200);
            if (this.sprite.body.touching.down && !this.isJumping) this.sprite.play('run', true);
            this.sprite.flipX = false;
        } else {
            this.sprite.setVelocityX(0);
            if (this.sprite.body.touching.down && !this.isJumping) this.sprite.play('idle', true);
        }

        if ((cursors.up.isDown || cursors.space.isDown) && this.sprite.body.touching.down) {
            this.jump();
        }

        if (!this.sprite.body.touching.down && !this.isJumping) {
            this.sprite.play('jump', true);
            this.isJumping = true;
            this.scene.sound.play('jump');

        } else if (this.sprite.body.touching.down) {
            this.isJumping = false;
        }
    }
    //velocity at which player can jump
    jump() {
        if (this.sprite.body.touching.down) {
            this.sprite.setVelocityY(-480);
        }
    }
};