/*function preload() {
  //=============================================
    this.load.image('player', 'assets/repl.png');
  //=============================================
    this.load.image('background', 'assets/background.png');
    this.load.image('personagem', 'assets/player/idle.gif');
}

function create() {
    const width = this.scale.width;
    const height = this.scale.height;

    this.add.image(width*0.5, height*0.5,'background')


//===========================================================
    this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

    this.player = this.physics.add.image(config.width / 2, config.height / 2, 'personagem').setScale(2.5, 2.5);
    this.player.setCollideWorldBounds(true);
}

function update() {
    let cursors = this.input.keyboard.createCursorKeys();
    if ((cursors.left.isDown || this.a.isDown) || (cursors.right.isDown || this.d.isDown)) this.player.setVelocityX(cursors.left.isDown || this.a.isDown ? -160 : 160);
    else this.player.setVelocityX(0);
    if ((cursors.up.isDown || this.w.isDown) || (cursors.down.isDown || this.s.isDown)) this.player.setVelocityY(cursors.up.isDown || this.w.isDown ? -160 : 160);
    else this.player.setVelocityY(0);
}

const config = {
    type: Phaser.AUTO,
    width: 998,
    height: 643,
    backgroundColor: '#f9f9f9',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
*/

export default window.Phaser;
import Game from "./game/inicio.js";

console.dir(Phaser)

new Phaser.Game({
    type: Phaser.AUTO,
    width: 998,
    height: 643,
    scene: ["inicio","game/inicio.js"],
    scale: {mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH},
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 1000
            },
            debug: false
        }
    }
});
