class room1 extends Phaser.Scene {

    constructor() {
        super({ key: 'forestRoom' });
        
        // Put global variable here
    }


    init(data) {
        
    }

    preload() {
    
    this.load.tilemapTiledJSON('forest','assets/forest.json');
    this.load.image('forest', 'assets/mapImgs/forest-tileset.png');
    }

    create() {
        console.log('*** forestRoom scene');
        
        var map = this.make.tilemap({key:'forestRoom'});

        var tileset1= map.addTilesetImage('forest','forest');

        let tilesArray = [tileset1]

        this.groundLayer = map.createLayer('grds',tilesArray,0,0)
        this.wallLayer = map.createLayer('forest_wall',tilesArray,0,0)
        this.objectLayer = map.createLayer('objects',tilesArray,0,0)
    }

    update() {

    }

    

}
