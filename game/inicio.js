export default window.Phaser;
export default class GameStart extends Phaser.Scene{
  constructor()
  {
    super("game-start");
  }

  preload() {
    this.load.image("inicio", "assets/title.png");
    this.load.audio("musical_beginning", ["assets/music/abertura.mp3"]);


    this.load.spritesheet("P_Parado_D", "assets/player/idle.gif", { frameWidth: 180, frameHeight: 180 });
    this.load.spritesheet("P_Pulo_D", "assets/player/jump.png", { frameWidth: 180, frameHeight: 180 });
    this.load.spritesheet("P_Queda_D", "assets/player/landing.png", { frameWidth: 180, frameHeight: 180 });
    this.load.spritesheet("P_Correr_D", "assets/player/run.gif", { frameWidth: 180, frameHeight: 180 });
    this.load.spritesheet("P_Parado_E", "assets/player/idleE.gif", { frameWidth: 180, frameHeight: 180 });
    this.load.spritesheet("P_Pulo_E", "assets/player/jumpE.png", { frameWidth: 180, frameHeight: 180 });
    this.load.spritesheet("P_Queda_E", "assets/player/landingE.png", { frameWidth: 180, frameHeight: 180 });
    this.load.spritesheet("P_Correr_E", "assets/player/runE.gif", { frameWidth: 180, frameHeight: 180 });
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;
  
    this.add.image(width*0.5, height*0.5,"inicio");

    const backgroundSound = this.sound.add("musical_beginning") ;
    backgroundSound.setLoop(true);
    backgroundSound.play();
    backgroundSound.setVolume(0.025);

    this.input.keyboard.once("keydown_SPACE", () => {this.scene.start("game", backgroundSound)});
  }
}