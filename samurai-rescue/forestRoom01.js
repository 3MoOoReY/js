class forestRoom01 extends Phaser.Scene {

    constructor() {
        super({ key: 'forestRoom01' });
        
        // Put global variable here
    }


    init(data) {
        
    }

    preload() {

        var map = this.load.tilemapTiledJSON('forest1','assets/forest01.json')
    // this.load.tilemapTiledJSON('forest','assets/forest.json');

        this.load.image('forestPNG', 'assets/mapImgs/forest-tileset.png');

    // Samurai Character
        this.load.spritesheet('hero', 'assets/SamuraiHero.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('slimeG', 'assets/pngs/slimeGREEN.png', { frameWidth: 32, frameHeight: 32 });
}

    create() {
        console.log("Forest Room")
        
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

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    
    // 2nd parameter is key in Preload
        var tileset1= map.addTilesetImage('forest-tileset','forestPNG');

        let tilesArray = [tileset1]

        this.groundLayer = map.createLayer('grds',tilesArray,0,0)
        this.wallLayer = map.createLayer('forest_wall',tilesArray,0,0)
        this.objectsLayer = map.createLayer('objects',tilesArray,0,0)
        // this.objectLayer = map.createLayer('objects',tilesArray,0,0)

    // Enemy Character
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('hero', { start: 2, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('hero', { start: 5, end: 6 }),
            frameRate: 10,
            repeat: -1
        });
    
          this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('hero', { start: 7, end: 9 }),
            frameRate: 10,
            repeat: -1
        });

    // set the boundaries of our game world
        this.physics.world.bounds.width = this.groundLayer.width;
        this.physics.world.bounds.height = this.groundLayer.height;


    // load player into phytsics
        this.player = this.physics.add.sprite(489, 910, 'hero').setScale(1)
        
        this.slimeG01 = this.physics.add.sprite(353, 672, 'slimeG').setScale(1)
        this.slimeG02 = this.physics.add.sprite(800.00, 477.33, 'slimeG').setScale(1)
        this.slimeG03 = this.physics.add.sprite(453, 130, 'slimeG').setScale(1)

    //  Input Events
        this.cursors = this.input.keyboard.createCursorKeys();

    // make the camera follow the player
        this.cameras.main.startFollow(this.player);

    // create the this.playersprite
    this.player.setCollideWorldBounds(true); // don't go out of the this.map
    window.player = this.player;

    this.wallLayer.setCollisionByProperty({ wall: true });
    this.objectsLayer.setCollisionByProperty({ wall: true });
    

    // this.playerwill collide with the level tiles
    // this.physics.add.collider(this.itemLayer, this.player);
    this.physics.add.collider(this.wallLayer, this.player);
    this.physics.add.collider(this.objectsLayer, this.player);
    

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
        this.player.setVelocity(0);
    }

    } // End of Update

    world(player, tile){
        console.log("Welcome back the World");
        this.scene.start("gameScene");
    }
}


function moveRightLeft1() {
    console.log("moveRightLeft");
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
    console.log("moveRightLeft");
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
    console.log("moveSquare");
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