//startscreen.js

class startscreen extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'startscreen' });
    }

    
    preload(){
    // instructions2
    this.load.image('startscreenPNG', 'assets/screens/Screen_01.png');

    }

    create() {
        this.add.image(0, 0, 'startscreenPNG').setOrigin(0, 0);

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            // console.log("Spacebar pressed, goto storyline");
            this.scene.start("storyline");
            }, this );


    }

    update(){



    }
}