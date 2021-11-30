var config = {
    type: Phaser.AUTO,
    ////// pixel size * tile map size * zoom 
    width: 32 * 10,
    height: 32 * 10,
    /////////////////////////////////////////
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#202123',
    pixelArt: true,
    //// Add all scenes below in the array
    scene: [preloadScene, gameScene, forestRoom01, abandonedCity01, cave01]
    // scene: [preloadScene, gameScene,  abandonedCity01]
    // scene: [preloadScene, gameScene, endScene]
};

var game = new Phaser.Game(config);