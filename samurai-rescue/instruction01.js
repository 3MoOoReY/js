//storyline.js

class instruction01 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'instruction01' });
    }

    
    preload(){
    // instructions2
    this.load.image('instruction01PNG', 'assets/screens/Screen_03.png');

    }

    create() {
        this.add.image(0, 0, 'instruction01PNG').setOrigin(0, 0);

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            // console.log("Spacebar pressed, goto instruction02");
            this.scene.start("instruction02");
            }, this );


    }

    update(){



    }
}