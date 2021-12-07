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
    scene: [startscreen, storyline, instruction01, instruction02, instruction03, rule01, bigworld, forestRoom01, abandonedCity01, cave01]
};

var game = new Phaser.Game(config);