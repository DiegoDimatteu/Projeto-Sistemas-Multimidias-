import Phaser from "../lib/phaser.js";

 export default class GameOver extends Phaser.Scene
 {
 constructor()
 {
  super("game-over");
 }

init(data) {
    console.log("init", data);
    this.finalScore = data.highscore;
    this.scoreRun = data.score;
}

 create() {
  
 const width = this.scale.width;
 const height = this.scale.height;

 this.input.keyboard.once("keydown_SPACE", () => {this.scene.start("game")});

 this.add.text(width * 0.5, height * 0.4, "Você falhou!!", {fontSize: 48, fontWeight: "bold"}).setOrigin(0.5);
 this.add.text(width * 0.5, height * 0.58, "Não desista!!",{fontSize: 18}).setOrigin(0.5);
 this.add.text(width * 0.5, height * 0.63, "Aperte espaço e tente novamente.",{fontSize: 18}).setOrigin(0.5);
 this.add.text(width * 0.5, height * 0.73, "Pontuação atual: "+ this.scoreRun,{fontSize: 18}).setOrigin(0.5);
 this.add.text(width * 0.5, height * 0.78, "Melhor pontuação: "+ this.finalScore,{fontSize: 18}).setOrigin(0.5);
 }
 }