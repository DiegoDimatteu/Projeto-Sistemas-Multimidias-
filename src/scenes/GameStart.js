import Phaser from "../lib/phaser.js";

export default class GameStart extends Phaser.Scene
 {
 constructor()
 {
  super("game-start");
 }

 preload() {
  this.load.image("inicio", "assets/title.png");
  this.load.audio("musical_beginning", ["assets/music/abertura.mp3"]);
 }

 create() {
  const width = this.scale.width;
  const height = this.scale.height;
 
  this.add.image(width*0.5, height*0.5,"inicio");

  const backgroundSound = this.sound.add("musical_beginning") ;
  backgroundSound.setLoop(true);
  backgroundSound.play();
  backgroundSound.setVolume(0.020);

  this.input.keyboard.once("keydown_SPACE", () => {this.scene.start("game", backgroundSound)});

 }
}