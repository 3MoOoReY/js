class cave01 extends Phaser.Scene {

    constructor() {
        super({ key: 'cave01' });
        
        // Put global variable here
    }


    init(data) {
        
    }

    preload() {

        var map = this.load.tilemapTiledJSON('cave01','assets/cave.json')
    // this.load.tilemapTiledJSON('forest','assets/forest.json');

        this.load.image('cavePNG', 'assets/mapImgs/cave-tilesets.png');

    // Samurai Character
        this.load.spritesheet('hero', 'assets/SamuraiHero.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('slimeR', 'assets/pngs/slimeRED.png', { frameWidth: 32, frameHeight: 32 });
}

    create() {
        // console.log("City Room")
        
        var map = this.make.tilemap({key:'cave01'});
        
    // Call first time without a loop
        this.time.addEvent({
            delay: 100,
            callback: moveRightLeft5,
            callbackScope: this,
            loop: false,
          });
        this.time.addEvent({
            delay: 100,
            callback: moveRightLeft6,
            callbackScope: this,
            loop: false,
          });
        this.time.addEvent({
            delay: 100,
            callback: moveSquare3,
            callbackScope: this,
            loop: false,
            });

            // this.tweens.add({
            //     targets: image,
            //     x: 700,
            //     duration: 3000,
            //     ease: 'Power2',
            //     yoyo: true,
            //     delay: 0
            // });

        // End of loop

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    
    // 2nd parameter is key in Preload
        var tileset1= map.addTilesetImage('cave-tilesets','cavePNG');

        let tilesArray = [tileset1]

        this.groundLayer = map.createLayer('grds',tilesArray,0,0)
        this.wallLayer = map.createLayer('cave_wall',tilesArray,0,0)
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
        
        this.slimeR01 = this.physics.add.sprite(353, 672, 'slimeR').setScale(1)
        this.slimeR02 = this.physics.add.sprite(800.00, 477.33, 'slimeR').setScale(1)
        this.slimeR03 = this.physics.add.sprite(453, 130, 'slimeR').setScale(1)

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

        if(this.player.x > 836 && this.player.x < 893
            && this.player.y >66 && this.player.y < 178){
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
}


function moveRightLeft5() {
    // console.log("moveRightLeft");
    this.tweens.timeline({
      targets: this.slimeR01,
      loop: -1, // loop forever
      ease: "Linear",
      duration: 2500,
      tweens: [
        {
          x: 738,
        },
        {
          x: 291,
        },
        {
          x: 738,
        },
      ],
    });
  }

  function moveRightLeft6() {
    // console.log("moveRightLeft");
    this.tweens.timeline({
      targets: this.slimeR02,
      loop: -1, // loop forever
      ease: "Linear",
      duration: 2500,
      tweens: [
        {
          x: 291,
        },
        {
          x: 738,
        },
        {
          x: 291,
        },
      ],
    });
  }

  function moveSquare3() {
    // console.log("moveSquare");
    this.tweens.timeline({
      targets: this.slimeR03,
      ease: "Linear",
      loop: -1, // loop forever
      duration: 2500,
  
      tweens: [
        {
          x: 352,
        },
        {
          y: 190,
        },
        {
          x: 546,
        },
        {
          y: 191,
        },
        {
          x: 546,
        },
        {
          y: 322,
        },
        {
          x: 352,
        },
        {
          y: 320,
        },
      ],
    });
  }