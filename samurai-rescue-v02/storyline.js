//storyline.js

class storyline extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'storyline' });
    }

    
    preload(){
    // instructions2
    this.load.image('storylinePNG', 'assets/screens/Screen_02.png');

    }

    create() {
        this.add.image(0, 0, 'storylinePNG').setOrigin(0, 0);

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            console.log("Spacebar pressed, goto instruction01");
            this.scene.start("instruction01");
            }, this );


    }

    update(){



    }
}