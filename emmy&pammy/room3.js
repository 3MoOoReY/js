class room1 extends Phaser.Scene {

    constructor() {
        super('room1');
        
        // Put global variable here
    }


    init(data) {
     
    }

    preload() {
        var map = this.load.tilemapTiledJSON("room1",'assets/room1.json');

        this.load.image("classroompng","assets/classroom32x32.png");
        this.load.image("shelvespng","assets/shelves32x32.png");

        // characters
        this.load.atlas('emmy', 'assets/player.png', 'assets/player.json');

    }

    create() {
        console.log('*** room1 scene');

           let map = this.make.tilemap({key: "room1"});

           let tileset1= map.addTilesetImage("classroom32x32", "classroompng");
           let tileset2= map.addTilesetImage("shelves32x32", "shelvespng");

           let tilesArray = [tileset1];

           this.groundLayer = map.createLayer("groundLayer", tilesArray, 0, 0);
           this.tableLayer = map.createLayer("tableLayer", tilesArray, 0, 0);
           this.chairLayer = map.createLayer("chairLayer", tilesArray, 0, 0);
           this.cabinetLayer = map.createLayer("cabinetLayer", tilesArray, 0, 0);
           this.chairLayer = map.createLayer("bookLayer", tilesArray, 0, 0);

           // Enable debugging
           window.player = this.player;

           this.anims.create({
            key:"left",
            frames:[
                {key:"emmy",frame:"left1"},
                {key:"emmy",frame:"left2"},
                {key:"emmy",frame:"left3"},
                {key:"emmy",frame:"left4"},
                {key:"emmy",frame:"left5"},
                {key:"emmy",frame:"left6"},
                {key:"emmy",frame:"left7"},
                {key:"emmy",frame:"left8"},
                {key:"emmy",frame:"left9"},
            ],
            frameRate:10,
            repeat:-1
        });
    
        this.anims.create({
            key:"right",
            frames:[
                {key:"emmy",frame:"right1"},
                {key:"emmy",frame:"right2"},
                {key:"emmy",frame:"right3"},
                {key:"emmy",frame:"right4"},
                {key:"emmy",frame:"right5"},
                {key:"emmy",frame:"right6"},
                {key:"emmy",frame:"right7"},
                {key:"emmy",frame:"right8"},
                {key:"emmy",frame:"right9"},
            ],
            frameRate:10,
            repeat:-1
        });
    
        this.anims.create({
            key:"up",
            frames:[
                {key:"emmy",frame:"back1"},
                {key:"emmy",frame:"back2"},
                {key:"emmy",frame:"back3"},
                {key:"emmy",frame:"back4"},
                {key:"emmy",frame:"back5"},
                {key:"emmy",frame:"back6"},
                {key:"emmy",frame:"back7"},
                {key:"emmy",frame:"back8"},
                {key:"emmy",frame:"back9"},
            ],
            frameRate:10,
            repeat:-1
        });
    
        this.anims.create({
            key:"down",
            frames:[
                {key:"emmy",frame:"front1"},
                {key:"emmy",frame:"front2"},
                {key:"emmy",frame:"front3"},
                {key:"emmy",frame:"front4"},
                {key:"emmy",frame:"front5"},
                {key:"emmy",frame:"front6"},
                {key:"emmy",frame:"front7"},
                {key:"emmy",frame:"front8"},
                {key:"emmy",frame:"front9"},
            ],
            frameRate:10,
            repeat:-1
        });

        this.physics.world.bounds.width = this.groundLayer.width*2;
        this.physics.world.bounds.height = this.groundLayer.height*2;
        
        // load player into phytsics
        this.player = this.physics.add.sprite(30, 260, "emmy").setScale(2)
        
        //enable
        window.player = this.player;

        this.player.setCollideWorldBounds(true); //don't go out of this map
        
        this.cabinetLayer.setCollisionByExclusion (-1,true);
        this.chairLayer.setCollisionByExclusion (-1,true);
        this.tableLayer.setCollisionByExclusion (-1,true);

        // this.physics.add.collider(this.player,this.cabinetLayer);
        this.physics.add.collider(this.player,this.chairLayer);
        this.physics.add.collider(this.player,this.tableLayer);
        this.physics.add.collider(this.player,this.cabinetLayer);

        //  Input Events
        this.cursors = this.input.keyboard.createCursorKeys();

        // make the camera follow the player
        this.cameras.main.startFollow(this.player);

    } // end of create //  

        update() {
            
            if(
                this.player.x > 293 &&
                this.player.x < 419 &&
                this.player.y > 603
            ){
                this.world();
            }
        
        if (this.cursors.left.isDown) 
        {
            this.player.setVelocityX(-200);
            this.player.anims.play('right', true);
        } 
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(200);
            this.player.anims.play('left', true);
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

    }

    //function to jump to world
    world(player,tile) {
        console.log("world function");
        this.scene.start('world')
    }

}
