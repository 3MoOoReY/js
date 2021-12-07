class bigworld extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'bigworld' });
    }

    preload() {

        var map = this.load.tilemapTiledJSON('world','assets/world.json')

        //this.load.image("cloud", "assets/Street32x32.png");

         this.load.image('world01PNG', 'assets/mapImgs/world01.png')
         this.load.image('world02PNG', 'assets/mapImgs/world02.png')

        // Samurai Character
        this.load.spritesheet('hero', 'assets/SamuraiHero.png', { frameWidth: 32, frameHeight: 32 });


    } // end of preload //

    create (){

    // console.log("World 01")
    // console.log(player.x);

   var map = this.make.tilemap({key:'world'});


    var tileset1= map.addTilesetImage('world01','world01PNG');
    var tileset2= map.addTilesetImage('world02','world02PNG');
    // var tileset3= map.addTilesetImage('playground 2','playground 2');
    // var tileset4= map.addTilesetImage('playground','playground');

    let tilesArray = [tileset1,tileset2]

    this.groundLayer = map.createLayer('grds',tilesArray,0,0)
    this.worldwallLayer = map.createLayer('world_wall',tilesArray,0,0)
    this.cityLayer = map.createLayer('cities',tilesArray,0,0)
    this.watersLayer = map.createLayer('waters',tilesArray,0,0)
    this.roadLayer = map.createLayer('road',tilesArray,0,0)

    
    // set the boundaries of our game world
    this.physics.world.bounds.width = this.groundLayer.width;
    this.physics.world.bounds.height = this.groundLayer.height;


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


    // load player into phytsics
    this.player = this.physics.add.sprite(943, 824, 'hero').setScale(0.7) // Original
    // this.player = this.physics.add.sprite(835.83, 1348.83, 'hero').setScale(0.7) // Testing

    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();

    // make the camera follow the player
    this.cameras.main.startFollow(this.player);

    
    // create the this.playersprite
    // this.player = this.physics.add.sprite(start.x, start.y, "hero");
    // this.player.setScale(2);
    this.player.setCollideWorldBounds(true); // don't go out of the this.map
    window.player = this.player;

    this.worldwallLayer.setCollisionByProperty({ wall: true });
    this.cityLayer.setCollisionByProperty({ wall: true });
    this.watersLayer.setCollisionByProperty({ waterCol: true });
    this.watersLayer.setCollisionByProperty({ wall: true });

    // this.playerwill collide with the level tiles
    // this.physics.add.collider(this.itemLayer, this.player);
    this.physics.add.collider(this.worldwallLayer, this.player);
    this.physics.add.collider(this.cityLayer, this.player);
    this.physics.add.collider(this.watersLayer, this.player);


    } // end of create //

    update () {

        if(this.player.x > 609 && this.player.x <615
            && this.player.y >512 && this.player.y < 544){
                this.forest01()
        }
        if(this.player.x > 1766 && this.player.x <1818
            && this.player.y >321 && this.player.y < 349){
                this.city01()
        }
        if(this.player.x > 815 && this.player.x <847
            && this.player.y >1279 && this.player.y < 1311){
                this.cave01()
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


    } // end of update // 
    
    forest01(player, tile){
        console.log("Welcome to the Forest 01");
        this.scene.start("forestRoom01");
    }
    forest02(player, tile){
        console.log("Welcome to the Forest 02");
        this.scene.start("forestRoom2");
    }
    forest03(player, tile){
        console.log("Welcome to the Forest 03");
        this.scene.start("forestRoom");
    }

    city01(player, tile){
        console.log("Welcome to the city 01");
        this.scene.start("abandonedCity01");
    }
    city02(player, tile){
        console.log("Welcome to the city 02");
        this.scene.start("city02");
    }
    city03(player, tile){
        console.log("Welcome to the city 03");
        this.scene.start("city03");
    }

    cave01(player, tile){
        console.log("Welcome to the cave 01");
        this.scene.start("cave01");
    }
    cave02(player, tile){
        console.log("Welcome to the cave 02");
        this.scene.start("cave02");
    }
    cave03(player, tile){
        console.log("Welcome to the cave 03");
        this.scene.start("cave03");
    }

}
