import { Player } from "./player.js";  
import {Obstacles} from "./obstacles.js";
export class GameScene extends Phaser.Scene{ //phaser built-in behaviour for gamescene
    constructor(){
        super("GameScene");
        this.isGameOver=false;
        this.score=0;
        this.currentUser=JSON.parse(localStorage.getItem('currentUser')); 
    }
    preload() {
        this.load.image('background', 'assets/images/test3.png');
        this.load.image('ground', 'https://labs.phaser.io/assets/sprites/platform.png');
        this.load.spritesheet('idle', 'assets/Shinobi/Idle.png', { frameWidth: 131, frameHeight: 128 });
        this.load.spritesheet('run', 'assets/Shinobi/Run.png', { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('jump', 'assets/Shinobi/Jump.png', { frameWidth: 128, frameHeight: 128 });
        this.load.image('spikeA', 'assets/spikes/spike A.png');
        this.load.image('spikeB', 'assets/spikes/spike B.png');
        this.load.image('spikeC', 'assets/spikes/spike C.png');
        this.load.image('spikeD', 'assets/spikes/spike D.png');
        this.load.audio('jump', 'assets/sound/jumpsound.wav');
        this.load.audio('gameover', 'assets/sound/gameover.wav');
    }

    create() {
        this.gameOverSound = this.sound.add('gameover', { volume: 0.5 }); 
        this.background = this.add.tileSprite(400, 300, 800, 600, 'background');//exactly at the centre 
        this.scoreText = this.add.text(16, 50, `Score: 0`, {
            fontSize: '32px',
            fill: '#ffffff',
            fontFamily: 'Arial',
            stroke: '#000000',
            strokeThickness: 4
        }).setScrollFactor(0); //text placemen stays fixed

        this.ground = this.physics.add.staticGroup();
        this.ground.create(400, 580, 'ground').setScale(2).refreshBody();

        this.player = new Player(this, 100, 500); 
        this.physics.add.collider(this.player.sprite, this.ground);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.addKey('R').on('down', () => this.restartGame());

        //run the hitobstacle function when player hit any obstacle
        this.obstacles = new Obstacles(this);
        this.physics.add.collider(this.player.sprite, this.obstacles.group, this.hitObstacle, null, this);

        this.scoreTimer = this.time.addEvent({
            delay: 2000,
            callback: () => {
                if (!this.isGameOver) {
                    this.score += 15;
                    this.scoreText.setText(`Score: ${this.score}`); 
                }
            },
            loop: true
        });

        this.time.addEvent({
            delay: 2000,
            callback: () => this.obstacles.spawn(), //obstacles first appear after 2 seconds 
            loop: true
        });
        
        //Display current username 
        this.add.text(600, 16, `Player: ${this.currentUser.username}`, {
            fontSize: '20px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        }).setScrollFactor(0);
    }

    //scene loop using phaser's per-frame update function
    update(time, delta) {
        if (this.isGameOver) return;
        this.background.tilePositionX += 2 * (delta / 16.66);
        this.player.move(this.cursors);
        this.obstacles.update();
    }

    hitObstacle(player, obstacle) {
       if( this.isGameOver) return;
       this.isGameOver=true;
       this.physics.pause();
        player.setTint(0xff0000);
        player.setVelocity(0);
        player.anims.stop();
        if (this.scoreTimer) this.scoreTimer.paused = true;
        if (this.gameOverSound) {
            this.gameOverSound.play();
        }

        //Add game over message when character dies 
        if (!this.gameOverText) { // Only create "game over" text if it doesn't exist
            this.gameOverText = this.add.text(400, 300, 'Game Over! Press R to Restart', {
                fontSize: '40px',
                fill: '#ff0000',
                fontFamily: 'Arial',
                stroke: '#000000',
                strokeThickness: 4
        }).setOrigin(0.5).setScrollFactor(0);
    }

    this.saveScore(this.score);
}

    //find current user and update score 
    saveScore(lastScore) {
        try {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            const userIndex = users.findIndex(u => u.email === this.currentUser.email);
            if (userIndex !== -1) {
                if (!users[userIndex].highScore || lastScore > users[userIndex].highScore) {
                    users[userIndex].highScore = lastScore;
                    localStorage.setItem('users', JSON.stringify(users));
                    localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
                }
            }
        } catch (e) {
            console.error('Failed to save score to localStorage:', e);
        }
    }
    
    restartGame() {
        this.isGameOver = false;
        this.player.sprite.clearTint().setPosition(100, 500).play('idle');//tint sprite red indicate player is dead/ game over
        this.physics.resume();
        this.obstacles.group.clear(true, true);
        this.score = 0;
        this.scoreText.setText(`Score: 0`);
        if (this.scoreTimer) this.scoreTimer.paused = false;
       if (this.gameOverText) {
            this.gameOverText.destroy();
            this.gameOverText = null; 
        }
        console.log('Game restarted');
    }
};
