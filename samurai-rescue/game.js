var config = {
    type: Phaser.AUTO,
    ////// pixel size * tile map size * zoom 
    width: 700,
    height: 450,
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
    scene: [
            // startscreen, storyline, instruction01, instruction02, instruction03, rule01, 
            bigworld, 
            forestRoom01,
            abandonedCity01, 
            cave01,
            gameover
        ]
};

var game = new Phaser.Game(config);

// window.greenRing = 1;
// window.blueRing = 1;
// window.redRing = 1;


window.health = 3;

window.score = 0;

window.scoreR = 0;
window.scoreB = 0;
window.scoreG = 0;

