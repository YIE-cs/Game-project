export class Obstacles {
    constructor(scene) {
        this.scene = scene;
        this.group = scene.physics.add.group();
    }
    //spawn obstacle as long as player is not dead
    spawn() {
        if (!this.scene.isGameOver) {
            const types = ['spikeA', 'spikeB', 'spikeC', 'spikeD'];
            const type = Phaser.Utils.Array.GetRandom(types);
            const obstacle = this.group.create(850, 525, type);
            obstacle.setOrigin(0.5, 1).setImmovable(true).setScale(0.3);
            obstacle.body.allowGravity = false;
            const startVelocity = -200; 
            const hardVelocity = -350; 
            //increase speed of obstacles after score=100
            obstacle.setVelocityX(this.scene.score >= 100 ? hardVelocity : startVelocity); 
            obstacle.setTint(0x808080);
        }
    }

    update() {
        this.group.getChildren().forEach(obstacle => {
            if (obstacle.x < -100) obstacle.destroy(); //destroy obstacle when it goes to the left 
        });
    }
};