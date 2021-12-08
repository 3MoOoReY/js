//storyline.js

class instruction03 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'instruction03' });
    }

    
    preload(){
    // instructions2
    this.load.image('instruction03PNG', 'assets/screens/Screen_05.png');

    }

    create() {
        this.add.image(0, 0, 'instruction03PNG').setOrigin(0, 0);

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            console.log("Spacebar pressed, goto instruction01");
            this.scene.start("rule01");
            }, this );


    }

    update(){



    }
}