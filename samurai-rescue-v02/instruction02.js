//storyline.js

class instruction02 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'instruction02' });
    }

    
    preload(){
    // instructions2
    this.load.image('instruction02PNG', 'assets/screens/Screen_04.png');

    }

    create() {
        this.add.image(0, 0, 'instruction02PNG').setOrigin(0, 0);

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            console.log("Spacebar pressed, goto instruction01");
            this.scene.start("instruction03");
            }, this );


    }

    update(){



    }
}