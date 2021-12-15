class forestRoom01 extends Phaser.Scene {

    constructor() {
        super({ key: 'forestRoom01' });

        // Put global variable here
    }


    init(data) {
        
    }

    preload() {
    //map made with Tiled in JSON format
      var map = this.load.tilemapTiledJSON('forest1','assets/forest01.json')

    // tiles in spritesheet
      this.load.image('forestPNG', 'assets/mapImgs/forest-tileset.png');
    // ring PNG
      this.load.image('greenRingPNG', 'assets/pngs/greenRing.png');
      this.load.image('gRing', 'assets/pngs/grayRing.png');
    // heart PNG
      this.load.spritesheet('heart','assets/pngs/heart.png',{frameWidth:32, frameHeight: 32});
    // Samurai Character
      this.load.spritesheet('hero', 'assets/SamuraiHero.png', { frameWidth: 32, frameHeight: 32 });
    // Emeny character
      this.load.spritesheet('slimeG', 'assets/pngs/slimeGREEN.png', { frameWidth: 32, frameHeight: 32 });

    // music 
    this.load.audio('ping', 'assets/music/ping.mp3');
    this.load.audio('heartLoss', 'assets/music/heartLoss.mp3');
    this.load.audio('death', 'assets/music/death.mp3');      
}

    create() {
        // console.log("Forest Room")
        // console.log("Score: ", window.score)
  
  // sound effects
    this.pingSnd = this.sound.add( 'ping');
    this.heartLossSnd = this.sound.add( 'heartLoss');
    this.deathSnd = this.sound.add( 'death');
        
      var map = this.make.tilemap({key:'forest1'});
        
 // Call first time without a loop
        this.time.addEvent({
            delay: 100,
            callback: moveRightLeft1,
            callbackScope: this,
            loop: false,
          });
        this.time.addEvent({
            delay: 100,
            callback: moveRightLeft2,
            callbackScope: this,
            loop: false,
          });
        this.time.addEvent({
            delay: 100,
            callback: moveSquare1,
            callbackScope: this,
            loop: false,
            });

  // End of loop

        
  // groundLayer & platformLayer from Tiled
        var tileset1= map.addTilesetImage('forest-tileset','forestPNG');

        let tilesArray = [tileset1]

        this.groundLayer = map.createLayer('grds',tilesArray,0,0)
        this.wallLayer = map.createLayer('forest_wall',tilesArray,0,0)
        this.objectsLayer = map.createLayer('objects',tilesArray,0,0)
        // this.objectLayer = map.createLayer('objects',tilesArray,0,0)

  // player animation
      this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
      });

      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('hero', { start: 4, end: 7 }),
        frameRate: 10,
        repeat: -1
      });

      this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('hero', { start: 8, end: 11 }),
        frameRate: 10,
        repeat: -1
      });

      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('hero', { start: 12, end: 15 }),
        frameRate: 10,
        repeat: -1
      });


  // emeny animation
      this.anims.create({
        key: "upslimeG",
        frames: this.anims.generateFrameNumbers('slimeG', { start : 0, end: 1 }),
        frameRate: 10,
        repeat: -1
        });
      this.anims.create({
        key: "leftslimeG",
        frames: this.anims.generateFrameNumbers('slimeG', { start : 2, end: 4 }),
        frameRate: 10,
        repeat: -1
        });
      this.anims.create({
        key: "downslimeG",
        frames: this.anims.generateFrameNumbers('slimeG', { start : 5, end: 6 }),
        frameRate: 10,
        repeat: -1
        });
      this.anims.create({
        key: "rightslimeG",
        frames: this.anims.generateFrameNumbers('slimeG', { start : 7, end: 9 }),
        frameRate: 10,
        repeat: -1
        });
  


  // set the boundaries of our game world
      this.physics.world.bounds.width = this.groundLayer.width;
      this.physics.world.bounds.height = this.groundLayer.height;

  // load player into phytsics
      this.player = this.physics.add.sprite(489, 910, 'hero').setScale(1);

  // load enemy into physics
      this.slimeG01 = this.physics.add.sprite(353, 672, 'slimeG').setScale(1).setSize(24,32) ;
      this.slimeG02 = this.physics.add.sprite(800.00, 477.33, 'slimeG').setScale(1).setSize(24,32);
      this.slimeG03 = this.physics.add.sprite(453, 130, 'slimeG').setScale(1).setSize(24,32);


  //  Input Events
      this.cursors = this.input.keyboard.createCursorKeys();  
      

  // make the camera follow the player
      this.cameras.main.startFollow(this.player);

  // create the this.player.sprite
      this.player.setCollideWorldBounds(true); // don't go out of the this.map
      window.player = this.player;

  // collision
      this.wallLayer.setCollisionByProperty({ wall: true });
      this.objectsLayer.setCollisionByProperty({ wall: true });

  // this.playerwill collide with the level tiles
  // this.physics.add.collider(this.itemLayer, this.player);        
      this.physics.add.collider(this.wallLayer, this.player);
      this.physics.add.collider(this.objectsLayer, this.player);
    


/////////////////// extra code ///////////////////
    // //hearts
        window.heart01 = this.add.image(675,16, 'heart').setScrollFactor(0).setVisible(true);
        window.heart02 = this.add.image(640,16,'heart').setScrollFactor(0).setVisible(true);
        window.heart03 = this.add.image(605,16,'heart').setScrollFactor(0).setVisible(true);

        if (window.health == 2){
          window.heart03.setVisible(false);
        } else if (window.health == 1){
          window.heart03.setVisible(false);
          window.heart02.setVisible(false);
        } else if (window.health == 0){
          window.heart03.setVisible(false);
          window.heart02.setVisible(false);
          window.heart01.setVisible(false);
          console.log('gameOver')
        } else{
          
        }

    // rings
        this.ring01 = this.add.image(25,20,'gRing').setScrollFactor(0);
        this.ring02 = this.add.image(60,20,'gRing').setScrollFactor(0);
        this.ring03 = this.add.image(95,20,'gRing').setScrollFactor(0);


/////////////////// extra code ///////////////////


  // collectables

    // this.greenRing1 = this.physics.add.sprite (894, 129, "greenRingPNG").setScale(0.35).setScrollFactor(0);
    this.greenRing1 = this.physics.add.sprite (894, 129, "greenRingPNG").setScale(0.40);


    if (window.scoreG == 1){
      window.greenRing03 = this.add.image(25,20,'greenRingPNG')
      .setScrollFactor(0)
      .setScale(0.5)
      .setVisible(true)
      ;
    } else{
      window.greenRing03 = this.add.image(25,20,'greenRingPNG')
      .setScrollFactor(0)
      .setScale(0.5)
      .setVisible(false)
      ;
    }
    if (window.scoreB == 2){
      window.blueRing03 = this.add.image(60,20,'blueRingPNG')
      .setScrollFactor(0)
      .setScale(0.5)
      .setVisible(true)
      ;
    } else{
      window.blueRing03 = this.add.image(60,20,'blueRingPNG')
      .setScrollFactor(0)
      .setScale(0.5)
      .setVisible(false)
      ;
    }
    if (window.scoreR == 3){
      window.redRing03 = this.add.image(95,20,'redRingPNG')
      .setScrollFactor(0)
      .setScale(0.5)
      .setVisible(true)
      ;
    } else{
      window.redRing03 = this.add.image(95,20,'redRingPNG')
      .setScrollFactor(0)
      .setScale(0.5)
      .setVisible(false)
      ;
    }
    


  // // overlap event
    this.physics.add.overlap(this.player, this.slimeG01, this.minusHealth1, null, this);
    this.physics.add.overlap(this.player, this.slimeG02, this.minusHealth1, null, this);
    this.physics.add.overlap(this.player, this.slimeG03, this.minusHealth1, null, this);



  // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    
  // player overlaps with any of the stars, if he does call the collectStar function
  this.physics.add.overlap(this.player, this.greenRing1, this.collectRing, null, this);
  this.physics.add.overlap(this.player, this.greenRing2, this.collectRing, null, this);
  

  // scoreGring = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

}

  update() {

        if(this.player.x > 10 && this.player.x < 23
            && this.player.y >288 && this.player.y < 353){
                this.world()
            }

        
        if (this.cursors.left.isDown) 
        {
            this.player.setVelocityX(-200);
            this.player.anims.play('left', true);
        } 
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(200);
            this.player.anims.play('right', true);
        }
        else if (this.cursors.up.isDown)
        {
            this.player.setVelocityY(-200);
            this.player.anims.play('up', true);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.setVelocityY(200);
            this.player.anims.play('down', true);
        } else {
            this.player.anims.stop();
            this.player.body.setVelocity(0, 0);
        } 
        

  } // End of Update
  
  world(player, tile){
    // console.log("Welcome back the World");
    this.scene.start("bigworld");
  }


  minusHealth1(player, slime)
  {
    this.heartLossSnd.play();
    console.log('lost one ponit')
    window.health --

    slime.disableBody(true, true);
    this.cameras.main.shake(200);

    if (window.health == 2){
      window.heart03.setVisible(false);
    } else if (window.health == 1){
      window.heart02.setVisible(false);
    } else if (window.health == 0){
      window.heart01.setVisible(false);
      console.log('you are dead');
      this.deathSnd.play();
      this.scene.start("gameover");
    } 

  }
  collectRing (player, ring)
  {
    this.pingSnd.play();
    console.log('collect')
    ring.disableBody(true, true);
    window.scoreG = 1;
    console.log('GreenRing: ' + window.scoreG)
    
    // this.ringText.setText(this.greenRingS + window.greenRing);

    // score += 10;
    // scoreText.setText('Score: ' + score);


    // display Ring icon
    if (window.scoreG === 1){
      window.greenRing03 = this.add.image(25,20,'greenRingPNG')
      .setScrollFactor(0)
      .setScale(0.5)
      .setVisible(true)
      ;
    } 

    
    

  }
  
}



function moveRightLeft1() {
    // console.log("moveRightLeft");
    this.tweens.timeline({
      targets: this.slimeG01,
      loop: -1, // loop forever
      ease: "Linear",
      duration: 2500,
      tweens: [
        {
          x: 353,
        },
        {
          x: 800.00,
        },
        {
          x: 353,
        },
      ],
    });
  }

  function moveRightLeft2() {
    // console.log("moveRightLeft");
    this.tweens.timeline({
      targets: this.slimeG02,
      loop: -1, // loop forever
      ease: "Linear",
      duration: 2500,
      tweens: [
        {
          x: 353.33,
        },
        {
          x: 800.00,
        },
        {
          x: 353.33,
        },
      ],
    });
  }

  function moveSquare1() {
    // console.log("moveSquare");
    this.tweens.timeline({
      targets: this.slimeG03,
      ease: "Linear",
      loop: -1, // loop forever
      duration: 2500,
  
      tweens: [
        {
          x: 453,
        },
        {
          y: 130,
        },
        {
          x: 653,
        },
        {
          y: 300,
        },
      ],
    });
  }