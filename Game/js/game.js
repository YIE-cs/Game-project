import { config } from './gameconfig.js';
import { GameScene } from './gamescene.js';

const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser) {
    console.log('You must register or log in first!');
    setTimeout(() => {
        window.location.href = 'login.html'; //redirect user to log in page if user is not signed in

    }, 1000);
} else {
    config.scene = GameScene;
    new Phaser.Game(config);
}