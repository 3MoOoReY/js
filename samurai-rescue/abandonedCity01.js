class abandonedCity01 extends Phaser.Scene {

    constructor() {
        super({ key: 'abandonedCity01' });
        
        // Put global variable here
    }


    init(data) {
        
    }

    preload() {
    //map made with Tiled in JSON format
        var map = this.load.tilemapTiledJSON('abandondedCity1','assets/abandoned_city01.json')
    // tiles in spritesheet
        this.load.image('cityPNG', 'assets/mapImgs/abandonded_city-tilesets.png');
    // ring PNG
        this.load.image('blueRingPNG', 'assets/pngs/blueRing.png');
        this.load.image('gRing', 'assets/pngs/grayRing.png');
    // heart PNG
        this.load.spritesheet('heart','assets/pngs/heart.png',{frameWidth:32, frameHeight: 32});
    // Samurai Character
        this.load.spritesheet('hero', 'assets/SamuraiHero.png', { frameWidth: 32, frameHeight: 32 });
    // Emeny character
        this.load.spritesheet('slime', 'assets/pngs/slime.png', { frameWidth: 32, frameHeight: 32 });
    // music 
    this.load.audio('ping', 'assets/music/ping.mp3');
    this.load.audio('heartLoss', 'assets/music/heartLoss.mp3');
    this.load.audio('death', 'assets/music/death.mp3');        
}

    create() {
        // console.log("City Room")
        
  // sound effects
      this.pingSnd = this.sound.add( 'ping');
      this.heartLossSnd = this.sound.add( 'heartLoss');
      this.deathSnd = this.sound.add( 'death');
        
      var map = this.make.tilemap({key:'abandondedCity1'});
        
  // Call first time without a loop
        this.time.addEvent({
            delay: 100,
            callback: moveRightLeft3,
            callbackScope: this,
            loop: false,
          });
        this.time.addEvent({
            delay: 100,
            callback: moveRightLeft4,
            callbackScope: this,
            loop: false,
          });
        this.time.addEvent({
            delay: 100,
            callback: moveSquare2,
            callbackScope: this,
            loop: false,
            });

  // End of loop

  
  // groundLayer & platformLayer from Tiled
        var tileset1= map.addTilesetImage('abandonded_city-tilesets','cityPNG');

        let tilesArray = [tileset1]

        this.groundLayer = map.createLayer('grds',tilesArray,0,0)
        this.wallLayer = map.createLayer('city_wall01',tilesArray,0,0)
        this.wallLayer02 = map.createLayer('city_wall02',tilesArray,0,0)
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
        key: "upslime",
        frames: this.anims.generateFrameNumbers('slime', { start : 0, end: 1 }),
        frameRate: 10,
        repeat: -1
        });
      this.anims.create({
        key: "leftslime",
        frames: this.anims.generateFrameNumbers('slime', { start : 2, end: 4 }),
        frameRate: 10,
        repeat: -1
        });
      this.anims.create({
        key: "downslime",
        frames: this.anims.generateFrameNumbers('slime', { start : 5, end: 6 }),
        frameRate: 10,
        repeat: -1
        });
      this.anims.create({
        key: "rightslime",
        frames: this.anims.generateFrameNumbers('slime', { start : 7, end: 9 }),
        frameRate: 10,
        repeat: -1
        });

    // set the boundaries of our game world
        this.physics.world.bounds.width = this.groundLayer.width;
        this.physics.world.bounds.height = this.groundLayer.height;

    // load player into phytsics
        this.player = this.physics.add.sprite(489, 910, 'hero').setScale(1)
        
        this.slime01 = this.physics.add.sprite(353, 672, 'slime').setScale(1)
        this.slime02 = this.physics.add.sprite(800.00, 477.33, 'slime').setScale(1)
        this.slime03 = this.physics.add.sprite(453, 130, 'slime').setScale(1)


    //  Input Events
        this.cursors = this.input.keyboard.createCursorKeys();

    // make the camera follow the player
        this.cameras.main.startFollow(this.player);

    // create the this.playersprite
    this.player.setCollideWorldBounds(true); // don't go out of the this.map
    window.player = this.player;

    this.wallLayer.setCollisionByProperty({ wall: true });
    this.wallLayer02.setCollisionByProperty({ wall: true });
    this.objectsLayer.setCollisionByProperty({ wall: true });
    

    // this.playerwill collide with the level tiles
    // this.physics.add.collider(this.itemLayer, this.player);
    this.physics.add.collider(this.wallLayer, this.player);
    this.physics.add.collider(this.wallLayer02, this.player);
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

    // this.blueRing1 = this.physics.add.sprite (894, 129, "blueRingPNG").setScale(0.35).setScrollFactor(0);
    this.blueRing1 = this.physics.add.sprite (127.33, 125.33, "blueRingPNG").setScale(0.40);


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
    this.physics.add.overlap(this.player, this.slime01, this.minusHealth2, null, this);
    this.physics.add.overlap(this.player, this.slime02, this.minusHealth2, null, this);
    this.physics.add.overlap(this.player, this.slime03, this.minusHealth2, null, this);


  // set bounds so the camera won't go outside the game world
      this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    
  // player overlaps with any of the stars, if he does call the collectStar function
      this.physics.add.overlap(this.player, this.blueRing1, this.collectRing2, null, this);
      this.physics.add.overlap(this.player, this.blueRing2, this.collectRing2, null, this);
}

    update() {

        if(this.player.x > 908 && this.player.x < 919
            && this.player.y >63.67 && this.player.y < 158){
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
        console.log("Welcome back the World");
        this.scene.start("bigworld");
    }

    minusHealth2(player, slime2)
  {
    this.heartLossSnd.play();
    console.log('lost one ponit')
    window.health --

    slime2.disableBody(true, true);
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
  collectRing2 (player, ring)
  {
    this.pingSnd.play();
    console.log('collect')
    ring.disableBody(true, true);
    window.scoreB = 2;
    console.log('blueRing: ' + window.scoreB)
    
    // this.ringText.setText(this.greenRingS + window.greenRing);

    // score += 10;
    // scoreText.setText('Score: ' + score);


    // display Ring icon
    if (window.scoreB === 2){
      window.blueRing03 = this.add.image(60,20,'blueRingPNG')
      .setScrollFactor(0)
      .setScale(0.5)
      .setVisible(true)
      ;
    } 

  }
}


function moveRightLeft3() {
    // console.log("moveRightLeft");
    this.tweens.timeline({
      targets: this.slime01,
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

  function moveRightLeft4() {
    // console.log("moveRightLeft");
    this.tweens.timeline({
      targets: this.slime02,
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

  function moveSquare2() {
    // console.log("moveSquare");
    this.tweens.timeline({
      targets: this.slime03,
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