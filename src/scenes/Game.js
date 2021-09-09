import Phaser from "../lib/phaser.js";

export default class Game extends Phaser.Scene {
    personagem
    platforms
    damages
    cursors
    jumpCount = 0
    dir = 1
    k = 0
    score
    highscore = 0
    
    constructor() {
        super("game")
    }

    init() {
    this.score = 0;
    }

    preload() {
        this.load.image("background", "assets/background.png");
        this.load.image("platform", "assets/plataforma00.png");
        this.load.image("damage", "assets/fire.png");


      
        this.load.image("sky","assets/sky.png");
        this.load.image("clouds","assets/clouds.png");
        this.load.image("far","assets/far-grounds.png");
        
        
        this.load.image("parallax","assets/parallax.png");
        this.load.image("forest","assets/forest.png");
        this.load.image("mountain","assets/mountain.png");


        this.load.audio("musica_fundo", ["assets/audio/background_song.mp3"]);
        this.load.spritesheet("Parado", "assets/player/paradoS.png", { frameWidth: 19, frameHeight: 34 });
        this.load.spritesheet("Parado2", "assets/player/paradoSE.png", { frameWidth: 19, frameHeight: 34});
        this.load.spritesheet("Queda", "assets/player/landingS.png", { frameWidth: 20, frameHeight: 35 });
        this.load.spritesheet("Queda2", "assets/player/landingSE.png", { frameWidth: 20, frameHeight: 35 });
        this.load.spritesheet("Pulo", "assets/player/jumpS.png", { frameWidth: 20, frameHeight: 40 });
        this.load.spritesheet("Pulo2", "assets/player/jumpSE.png", { frameWidth: 20, frameHeight: 40 });
        this.load.spritesheet("CorridaEsq", "assets/player/runSE.png", { frameWidth: 21, frameHeight: 33 });
        this.load.spritesheet("CorridaDir", "assets/player/runS.png", { frameWidth: 21, frameHeight: 33 });
    }

findBottomMostPlatform(){
    const platforms = this.platforms.getChildren();
    let bottomPlatform = platforms[0];

    for (let i = 1; i < platforms.length; ++i)
    {
      const platform = platforms[i];

      // discard any platforms that are above current
      if (platform.y < bottomPlatform.y)
      {
        continue;
      }

      bottomPlatform = platform;
    }

    return bottomPlatform;
}

findBottomMostDamage(){
    const damages = this.damages.getChildren();
    let bottomDamage = damages[0];

    for (let i = 1; i < damages.length; ++i)
    {
      const damage = damages[i];

      // discard any platforms that are above current
      if (damage.y < bottomDamage.y)
      {
        continue;
      }

      bottomDamage = damage;
    }

    return bottomDamage;
}
    

    create() {
      //if(this.score > 10){
        const width = this.scale.width;
        const height = this.scale.height;
        this.myCam = this.cameras.main;

        this.platforms = this.physics.add.staticGroup();
        this.damages = this.physics.add.staticGroup();
        
        //Parallax--------------------------------------------------
        this.add.image(width*0.5, height*0.5,"sky")
        .setScale(2.6)
        .setScrollFactor(0);

        this.bg1 = this.add.tileSprite(0,0,this.width,this.height,"clouds")
        .setOrigin(0,0)
        .setScale(1.9)
        .setScrollFactor(0);

        this.bg2 = this.add.tileSprite(0,0,this.width,this.height,"far")
        .setOrigin(0,-4)
        .setScale(0.8)
        .setScrollFactor(0);
        //-----------------------------------------------------------------
      //}
      /*else{
        const width = this.scale.width;
        const height = this.scale.height;
        this.myCam = this.cameras.main;

        this.platforms = this.physics.add.staticGroup();
        
        //Parallax--------------------------------------------------
        this.add.image(width*0.5, height*0.5,"parallax")
        .setScale(2.6)
        .setScrollFactor(0);

        this.bg1 = this.add.tileSprite(0,0,this.width,this.height,"mountain")
        .setOrigin(0,-0.5)
        .setScale(1.9)
        .setScrollFactor(0);

        this.bg2 = this.add.tileSprite(0,0,this.width,this.height,"forest")
        .setOrigin(0,-2.249)
        .setScale(0.8)
        .setScrollFactor(0);
        //-----------------------------------------------------------------
      }*/
        var scoreFont = "bold 100px Arial";
         
         const style = { color: "#DCDCDC", fontSize: 24 };
         this.scoreLabel = this.add.text(70, 40, "Score: 0", style).setScrollFactor(0).setOrigin(0.5, 0);
         this.scoreLabel.align = "left";

        
        const abacate = this.platforms.create(140, 400, "platform").setScale(0.8).body.updateFromGameObject();
        
        
        for (let i = 0; i < 5; ++i) {
            const x = Phaser.Math.Between(200, 500);
            const y = 150 * i;

            /** @type {Phaser.Physics.Arcade.Sprite} */
            const platform = this.platforms.create(x, y, "platform");
            platform.scale = 0.8;

            const body = platform.body;
            body.updateFromGameObject();
        } 

        for (let i = 0; i < 1; ++i) {

            const x1 = Phaser.Math.Between(200, 500);
            const y1 = 50 * 50;

            const damage = this.damages.create(x1, y1, "damage");
            damage.scale = 0.3;

            //this.damage.setSize(30, 10, true);
            /** @type {Phaser.Physics.Arcade.StaticBody} */

            const body01= damage.body;
            body01.updateFromGameObject();
        }


        this.personagem = this.physics.add.sprite(140, 270, "Parado");
        this.physics.add.collider(this.platforms, this.personagem);
        this.physics.add.collider(this.damages, this.personagem);
        //Hitbox - Collision box, false diz para só haver colisão com objetos vindo de baixo
        this.personagem.setSize(30, 10, true);
        this.personagem.body.checkCollision.up = false;
        //this.personagem.body.checkCollision.left = false
        //this.personagem.body.checkCollision.right = false
        
        //Camera ---------------------------------------------
        this.cameras.main.startFollow(this.personagem);
        //this.cameras.main.setBounds(0, 0, width* 3, height);
        //-----------------------------------------------------

        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors = this.input.keyboard.addKeys({up:Phaser.Input.Keyboard.KeyCodes.W,down:Phaser.Input.Keyboard.KeyCodes.S,left:Phaser.Input.Keyboard.KeyCodes.A,right:Phaser.Input.Keyboard.KeyCodes.D});
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        this.anims.create({
            key: "andar_e",
            frames: this.anims.generateFrameNumbers("CorridaEsq", { start: 0, end: 7}),
            frameRate: 16,
            repeat: -1
        });

        this.anims.create({
            key: "andar_d",
            frames: this.anims.generateFrameNumbers("CorridaDir", { start: 0, end: 7}),
            frameRate: 16,
            repeat: -1
        });
        
        this.anims.create({
            key: "parado",
            frames: this.anims.generateFrameNumbers("Parado", {start: 0, end: 11}),
            frameRate: 24,
            repeat: -1
        });
      
        this.anims.create({
            key: "parado_e",
            frames: this.anims.generateFrameNumbers("Parado2",{start: 0, end: 11}),
            frameRate: 24,
            repeat: -1
        });

        this.anims.create({
            key: "pulo",
            frames: this.anims.generateFrameNumbers("Pulo",{start: 0, end: 5}),
            frameRate: 12,
            repeat: -1
        });

        this.anims.create({
            key: "pulo_e",
            frames: this.anims.generateFrameNumbers("Pulo2",{start: 0, end: 5}),
            frameRate: 12,
            repeat: -1
        });

        this.anims.create({
            key: "caindo",
            frames: this.anims.generateFrameNumbers("Queda",{start: 0, end: 1}),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: "caindo_e",
            frames: this.anims.generateFrameNumbers("Queda2",{start: 0, end: 1}),
            frameRate: 10,
            repeat: -1
        });
    }

    update(t, dt) {
        const touchingDown = this.personagem.body.touching.down;

        const dir = 0;
        const yAnt = 0;


        //Parallax-------------------------------------
        this.bg1.tilePositionX = this.myCam.scrollX * .02;
        this.bg2.tilePositionX = this.myCam.scrollX * .04;
        //-----------------------------------------------

        this.platforms.children.iterate(child => {
            /** @type {Phaser.Physics.Arcade.Sprite} */
            const platform = child;

            const scrollY = this.cameras.main.scrollY;
            if (platform.y >= scrollY + 560) {
                platform.y = scrollY - Phaser.Math.Between(60, 68);
                platform.x = Phaser.Math.Between(200, 500);
                //platform.setVelocityX(20);
                platform.body.updateFromGameObject();
                this.score +=1;
                this.scoreLabel.text = ("Score: ") + this.score;
            }
        });

        if(this.score >= 30){
          this.damages.children.iterate(child => {
            /** @type {Phaser.Physics.Arcade.Sprite} */
            const damage = child;

            const scrollY = this.cameras.main.scrollY;
            if (damage.y >= scrollY + 560) {
                damage.y = scrollY - Phaser.Math.Between(60, 68);
                damage.x = Phaser.Math.Between(200, 500);
                //platform.setVelocityX(20);
                damage.body.updateFromGameObject();
            }
          });
        }

        if (this.cursors.left.isDown) {
            this.personagem.setVelocityX(-200);
            if(touchingDown){
            this.personagem.anims.playReverse("andar_e", true);
            }
            this.dir = 0;
        }
        else if (this.cursors.right.isDown) {
            this.personagem.setVelocityX(200);
            if(touchingDown){
            this.personagem.anims.play("andar_d", true);
            }
            this.dir = 1;
            
        }
        else {
            // stop movement if not left or right
            this.personagem.setVelocityX(0);
            if(touchingDown){
                if(this.dir === 0){
                    this.personagem.anims.playReverse("parado_e", true);
                }
                if(this.dir === 1){
                    this.personagem.anims.play("parado", true);
                }
            }
        }

        const isJumpJustDown = Phaser.Input.Keyboard.JustDown(this.cursors.up);

        if(isJumpJustDown && (touchingDown || this.jumpCount < 1)){
            this.personagem?.setVelocityY(-440);
            this.jumpCount++;
            if(this.dir === 0){
                this.personagem.anims.playReverse("pulo_e", true);
            }
            if(this.dir === 1){
                this.personagem.anims.play("pulo", true);
            }
        }

        else if(this.personagem.body.velocity.y >= 0 && !touchingDown){
            if(this.dir == 0){
                this.personagem.anims.playReverse("caindo_e", true);
            }
            if(this.dir == 1){
                this.personagem.anims.play("caindo", true);
            }
        }

        if(touchingDown){
            this.jumpCount = 0;
        }
        
        const bottomPlatform = this.findBottomMostPlatform()
        if (this.personagem.y > bottomPlatform.y + 400)
        {
            this.scene.start("game-over", { highscore: this.highscore, score: this.score });
        }

        const bottomDamage = this.findBottomMostDamage()
        if (this.personagem.body.touching.down && (bottomDamage.y - 27.2) == this.personagem.y)
        {
            this.scene.start("game-over", { highscore: this.highscore, score: this.score});
            //console.log(bottomDamage.y, this.personagem.y);
        }

      
        if(this.highscore < this.score)
        {
          this.highscore = this.score;
        }


    }
}

